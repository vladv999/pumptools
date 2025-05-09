'use client';

import { ToastContainer, toast } from 'react-toastify';
import { PublicKey, Transaction, Connection } from "@solana/web3.js";

import { useAppKit, useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { useAppKitConnection } from '@reown/appkit-adapter-solana/react';
import type { Provider } from "@reown/appkit-adapter-solana";
import {
    PROGRAM_ID,
    createUpdateMetadataAccountV2Instruction, 
    Metadata
} from "@metaplex-foundation/mpl-token-metadata";

export default function RevokeUpdate() {
    const { open } = useAppKit(); 
    const { address, isConnected } = useAppKitAccount();
    const { connection } = useAppKitConnection();
    
    const { walletProvider } = useAppKitProvider<Provider>("solana");

    async function handleClick(){

        if(!isConnected || !connection || !address){
            open({ view: "Connect" });
            return;
        }

        const tokenAddress = document.getElementById("revokeUpdateTokenAddress") as HTMLInputElement;
        const tokenAddressValue = tokenAddress.value.trim();

        if(!tokenAddressValue) {
            toast.error('Please enter a token address', {
                position: "top-center",
                autoClose: 5000,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }

        try {

            const [metadataAccount] = PublicKey.findProgramAddressSync(
                [Buffer.from("metadata"), PROGRAM_ID.toBuffer(), new PublicKey(tokenAddressValue).toBuffer()],
                PROGRAM_ID
            );

            const tokenData = await Metadata.fromAccountAddress(connection, metadataAccount);
            if(tokenData.isMutable == false) {
                toast.error('Token now is not mutable', {
                    position: "top-center",
                    autoClose: 5000,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                return;
            }
            
            const latestBlockHash = await connection.getLatestBlockhash();

            const updateMetadataInstruction = createUpdateMetadataAccountV2Instruction(
                {
                    metadata: metadataAccount,
                    updateAuthority: new PublicKey(address),
                    
                },
                {
                    updateMetadataAccountArgsV2: {
                        data: {
                            name: tokenData.data.name,
                            symbol: tokenData.data.symbol,
                            uri: tokenData.data.uri,
                            sellerFeeBasisPoints: 0,
                            creators: null,
                            collection: null,
                            uses: null,
                        },
                        updateAuthority: new PublicKey(address),
                        primarySaleHappened: false,
                        isMutable: false,
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

            toast.success('Success revoke update authority', {
                position: "top-center",
                autoClose: 5000,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

        } catch (error) {
            console.log("Error creating transaction:", error);
            
            toast.error('Error create transaction', {
                position: "top-center",
                autoClose: 5000,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }


    }

    return (
        <>
            <div className="token_price mb-2">
                Price: <span>Free</span>
            </div>
            <button className="btn btn-primary" onClick={handleClick}>Revoke Update Authority</button>
            
            <ToastContainer /> 
        </>
    )
}