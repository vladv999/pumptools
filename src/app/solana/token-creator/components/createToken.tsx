'use client';
import { useAppKit, useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import type { Provider } from "@reown/appkit-adapter-solana";
import { useAppKitConnection } from '@reown/appkit-adapter-solana/react';
import {
    MINT_SIZE,
    TOKEN_PROGRAM_ID,
    createInitializeMintInstruction,
    getMinimumBalanceForRentExemptMint,
    createAssociatedTokenAccountInstruction,
    getAssociatedTokenAddress,
    createMintToInstruction,
    createMintToCheckedInstruction,
    createSetAuthorityInstruction,
    AuthorityType
} from "@solana/spl-token";
import {
    Keypair,
    PublicKey,
    SystemProgram,
    Transaction,
    LAMPORTS_PER_SOL
} from "@solana/web3.js";
import {
    PROGRAM_ID,
    createCreateMetadataAccountV3Instruction, 
    DataV2,
} from "@metaplex-foundation/mpl-token-metadata";
import React, {useState} from "react";
import validate from "validate.js";
import { TOKEN_CREATE_FEE, TOKEN_CREATE_ADDRESS_FEE } from "../../config";
import { UploadMetadata } from '../../components/uploadMetadata';
import { ToastContainer, toast } from 'react-toastify';

export default function CreateToken() {
    const { open, close } = useAppKit(); 
    const { address, isConnected, caipAddress, status, embeddedWalletInfo } = useAppKitAccount();
    const { connection } = useAppKitConnection();
    const { walletProvider } = useAppKitProvider<Provider>("solana");
    const [buttonText, setButtonText] = useState("Create Token");
    
    async function handleClick() {
        
        const newTokenLink = document.getElementById('newTokenLink') as HTMLAnchorElement;
        const newTokenSignatureLink = document.getElementById('newTokenSignatureLink') as HTMLAnchorElement;

        newTokenLink.href = '';
        newTokenLink.innerHTML = '';
        newTokenSignatureLink.href = '';

        if(!isConnected || !connection || !address){
            open({ view: "Connect" });
            return;
        }

        const tokenData = validateForm();

        if(tokenData === false) return;


        let freezeAuthority: PublicKey|null = new PublicKey(address);
        if (tokenData.revoke_freeze == "on") {
            freezeAuthority = null;
        }

        let isMutable: boolean = true;
        if (tokenData.revoke_update == "on") {  
            isMutable = false;
        }

        
        try {

            setButtonText('Creating Token...');

            const metadataUrl = await UploadMetadata(tokenData);

            if (metadataUrl === null) {
                showError();
                setButtonText('Create Token');
                return;
            }

            const lamports = await getMinimumBalanceForRentExemptMint(connection);
            const latestBlockHash = await connection.getLatestBlockhash();
            const mintKeypair = Keypair.generate();
            const tokenATA= await getAssociatedTokenAddress(mintKeypair.publicKey, new PublicKey(address));
           

            const createMetadataInstruction = createCreateMetadataAccountV3Instruction(
                {
                    metadata: PublicKey.findProgramAddressSync([
                        Buffer.from("metadata"),
                        PROGRAM_ID.toBuffer(),
                        mintKeypair.publicKey.toBuffer(),
                    ],
                    PROGRAM_ID
                    )[0],
                    mint: mintKeypair.publicKey,
                    mintAuthority: new PublicKey(address),
                    payer: new PublicKey(address),
                    updateAuthority: new PublicKey(address),
                },
                {
                    createMetadataAccountArgsV3:{
                        data:{
                            name: tokenData.name || '',
                            symbol: tokenData.symbol || '',
                            uri: metadataUrl || '',
                            creators: null,
                            sellerFeeBasisPoints: 0,
                            uses: null,
                            collection: null,
                            
                        } as DataV2,
                        isMutable: isMutable,
                        collectionDetails: null,
                    },

                }
            );

            const tx = new Transaction().add(
                SystemProgram.createAccount({
                    fromPubkey: new PublicKey(address),
                    newAccountPubkey: mintKeypair.publicKey,
                    space: MINT_SIZE,
                    lamports,
                    programId: TOKEN_PROGRAM_ID,
                }),

                createInitializeMintInstruction(
                    mintKeypair.publicKey,
                    Number(tokenData.decimals),
                    new PublicKey(address),
                    freezeAuthority,
                ),

                createAssociatedTokenAccountInstruction(
                    new PublicKey(address),
                    tokenATA,
                    new PublicKey(address),
                    mintKeypair.publicKey
                ),

                createMintToCheckedInstruction(
                    mintKeypair.publicKey,
                    tokenATA,
                    new PublicKey(address),
                    Number(tokenData.suply) * Math.pow(10, Number(tokenData.decimals)),
                    Number(tokenData.decimals),
                ),
                
                createMetadataInstruction,


                //Service fee
                SystemProgram.transfer({
                    fromPubkey: new PublicKey(address),
                    toPubkey: new PublicKey(TOKEN_CREATE_ADDRESS_FEE),
                    lamports: TOKEN_CREATE_FEE * LAMPORTS_PER_SOL, 
                }),
              
            );

            if (tokenData.revoke_mint == "on") { 
                tx.add(
                    createSetAuthorityInstruction(
                        mintKeypair.publicKey, 
                        new PublicKey(address), 
                        AuthorityType.MintTokens, 
                        null, 
                    ),
                );
            }


            tx.recentBlockhash = latestBlockHash.blockhash;
            tx.feePayer = new PublicKey(address);
            tx.partialSign(mintKeypair);

            const signature = await walletProvider.signAndSendTransaction(tx);

            // const signature = await walletProvider.sendTransaction(
            //     tx,
            //     connection,
            //     {
            //       signers: [mintKeypair], 
            //     }
            // );

            newTokenLink.href = `https://solscan.io/token/${mintKeypair.publicKey.toBase58()}`;
            newTokenLink.innerHTML = mintKeypair.publicKey.toBase58();

            newTokenSignatureLink.href = `https://solscan.io/tx/${signature}`;

            const modal = document.getElementById("createTokenSucceesModal") as HTMLDivElement;
            const modal_layout = document.querySelector(".modal_layout") as HTMLDivElement;
            modal.style.display = "block";
            modal_layout.style.display = "block";

            setButtonText('Create Token');


        } catch (error) {
            console.log(error);
            showError();
            setButtonText('Create Token');
        }

        
    }

    return (
        <>
            <div className="token_price mb-2">
                
                <ul>
                    <li>Service Fee: <span>{TOKEN_CREATE_FEE} SOL</span></li>
                    <li>Token Deploy: <span>~0.02 SOL</span> <span className="price_desc">(Depends on network load)</span></li>
                </ul>
            </div>
            <div className="card product-store-card"> 
                <div className="card-body" style={{background: "#00000012"}}>
                    <i className="ph-bold  ph-circle circle-bg-img"></i>
                    <div>
                        <p className="text-success f-s-18 f-w-600 txt-ellipsis-1 d-flex align-items-center">
                            <i className="iconoir-cart me-2"></i> Total
                        </p>
                        <h2 className="text-success-dark mb-0">0.1 SOL</h2>
                    </div>

                </div>
            </div>
            <button className="btn btn-primary btn-xxl d-flex align-items-center px-5 btn_create_token" type="button" onClick={handleClick}>
                <i className="iconoir-coins"></i> 
                <span className="ms-2">{buttonText}</span>
            </button>
            <ToastContainer /> 
        </>
    )
}

function showError() {
    toast.error('Something went wrong, try again', {
        position: "top-center",
        autoClose: 5000,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
}

function validateForm() {
    const formElement = document.querySelector('#solanaCreateTokenForm') as HTMLFormElement;
    if (!formElement) {
        console.error("Form element not found");
        return false;
    }

    const validElement = document.querySelectorAll('.validation_text') as NodeListOf<HTMLDivElement>;
    validElement.forEach((element) => {
        element.style.display = "none";
    });

    const formData = new FormData(formElement);
    const tokenData = {
        name: formData.get('name') as string,
        symbol: formData.get('symbol') as string,
        decimals: parseInt(formData.get('decimals') as string),
        suply: parseInt(formData.get('suply') as string),
        description: formData.get('description') as string,
        revoke_freeze: formData.get('revoke_freeze'),
        revoke_mint: formData.get('revoke_mint'),
        revoke_update: formData.get('revoke_update'),
        icon_upload: formData.get('icon_upload') as File,
    }

    const rules = { 
        'name': { presence: true, type: "string", length: { minimum: 1, maximum: 30 } },
        'symbol': { presence: true, type: "string", length: { minimum: 1, maximum: 10 } },
        'decimals': { presence: true, type: "integer", numericality: { greaterThan: 0 } },
        'suply': { presence: true, type: "integer", numericality: { greaterThan: 0 } },
        'description': { type: "string", length: { maximum: 100 } },
    }
    

    const validation = validate(tokenData, rules);
    if (validation !== undefined) {
        for (const [key, value] of Object.entries(validation) as [string, string[]][]) {
            const errorElement = document.querySelector('#valid_error_'+key) as HTMLDivElement;
            errorElement.innerHTML = value[0];
            errorElement.style.display = "block";
            
        }
        return false;
    }

    if (!tokenData.icon_upload.name.match(/.(jpg|jpeg|png)$/i) || tokenData.icon_upload.size > 10 * 1024 * 1024 || tokenData.icon_upload.size == 0) {
        const errorElement = document.querySelector('#valid_error_icon_upload') as HTMLDivElement;
        errorElement.innerHTML = 'Invalid icon format or size';
        errorElement.style.display = "block"; 
        return false;
    }

    return tokenData;
}