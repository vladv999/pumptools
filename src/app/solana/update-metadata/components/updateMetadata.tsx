'use client';
import { useAppKit, useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import type { Provider } from "@reown/appkit-adapter-solana";
import { useAppKitConnection } from '@reown/appkit-adapter-solana/react';
import {
    PublicKey,
    Transaction,
} from "@solana/web3.js";
import {
    PROGRAM_ID,
    createUpdateMetadataAccountV2Instruction,
    Metadata
} from "@metaplex-foundation/mpl-token-metadata";
import React, {useState} from "react";
import validate from "validate.js";
import { UploadMetadata } from '../../components/uploadMetadata';
import { ToastContainer, toast } from 'react-toastify';


export default function UpdateMetadata() {
    const { open } = useAppKit(); 
    const { address, isConnected } = useAppKitAccount();
    const { connection } = useAppKitConnection();
    const { walletProvider } = useAppKitProvider<Provider>("solana");
    const [buttonText, setButtonText] = useState("Update Metadata");
    
    async function handleClick() {
        if(!isConnected || !connection || !address){
            open({ view: "Connect" });
            return;
        }

        const tokenData = validateForm();
        if(tokenData === false) return;
        
        try {

            setButtonText('Updating Metadata...');

            const metadataUrl = await UploadMetadata(tokenData);

            if (metadataUrl === null) {
                showError();
                setButtonText('Update Metadata');
                return;
            }

            
            const latestBlockHash = await connection.getLatestBlockhash();
           
            const [metadataAccount] = PublicKey.findProgramAddressSync(
                [Buffer.from("metadata"), PROGRAM_ID.toBuffer(), new PublicKey(tokenData.token_address).toBuffer()],
                PROGRAM_ID
            );

            const tokenCurrentMeta = await Metadata.fromAccountAddress(connection, metadataAccount);
            if(tokenCurrentMeta.isMutable == false) {
                toast.error('Token now is not mutable', {
                    position: "top-center",
                    autoClose: 5000,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                return;
            }

            const updateMetadataInstruction = createUpdateMetadataAccountV2Instruction(
                {
                    metadata: metadataAccount,
                    updateAuthority: new PublicKey(address),
                    
                },
                {
                    updateMetadataAccountArgsV2: {
                        data: {
                            name: tokenData.name,
                            symbol: tokenData.symbol,
                            uri: metadataUrl,
                            sellerFeeBasisPoints: 0,
                            creators: null,
                            collection: null,
                            uses: null,
                        },
                        updateAuthority: new PublicKey(address),
                        primarySaleHappened: false,
                        isMutable: true,
                    },
                }
            );
            
            const tx = new Transaction().add(updateMetadataInstruction);

            tx.recentBlockhash = latestBlockHash.blockhash;
            tx.feePayer = new PublicKey(address);

            
            const signature = await walletProvider.signAndSendTransaction(tx);

            // const signature = await walletProvider.sendTransaction(
            //     tx,
            //     connection
            // );

            toast.success('Metadata update successfully', {
                position: "top-center",
                autoClose: 5000,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

            setButtonText('Update Metadata');


        } catch (error) {
            console.log(error);
            showError();
            setButtonText('Update Metadata');
        }

        
    }

    return (
        <>
            <div className="token_price mb-2">
                Price: <span>Free</span> + Transaction Fee
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
    const formElement = document.querySelector('#solanaUpdateMetadataForm') as HTMLFormElement;
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
        token_address: formData.get('token_address') as string,
        name: formData.get('name') as string,
        symbol: formData.get('symbol') as string,
        description: formData.get('description') as string,
        icon_upload: formData.get('icon_upload') as File,
    }

    const rules = { 
        'token_address': { presence: true, type: "string", length: { minimum: 43, maximum: 43 } },
        'name': { presence: true, type: "string", length: { minimum: 1, maximum: 30 } },
        'symbol': { presence: true, type: "string", length: { minimum: 1, maximum: 10 } },
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

    // if (!tokenData.icon_upload.name.match(/.(jpg|jpeg|png)$/i) || tokenData.icon_upload.size > 2 * 1024 * 1024 || tokenData.icon_upload.size == 0) {
    //     const errorElement = document.querySelector('#valid_error_icon_upload') as HTMLDivElement;
    //     errorElement.innerHTML = 'Invalid icon format or size';
    //     errorElement.style.display = "block"; 
    //     return false;
    // }

    return tokenData;
}