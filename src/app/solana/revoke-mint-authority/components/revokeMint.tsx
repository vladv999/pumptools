'use client';

import { ToastContainer, toast } from 'react-toastify';
import { PublicKey, Transaction } from "@solana/web3.js";
import { createSetAuthorityInstruction, AuthorityType } from "@solana/spl-token";

import { useAppKit, useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { useAppKitConnection } from '@reown/appkit-adapter-solana/react';
import type { Provider } from "@reown/appkit-adapter-solana";

export default function RevokeMint() {
    const { open, close } = useAppKit(); 
    const { address, isConnected, caipAddress, status, embeddedWalletInfo } = useAppKitAccount();
    const { connection } = useAppKitConnection();
    
    const { walletProvider } = useAppKitProvider<Provider>("solana");

    async function handleClick(){

        if(!isConnected || !connection || !address){
            open({ view: "Connect" });
            return;
        }

        const tokenAddress = document.getElementById("revokeMintTokenAddress") as HTMLInputElement;
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

            
            const latestBlockHash = await connection.getLatestBlockhash();

            const tx = new Transaction().add(
                createSetAuthorityInstruction(
                    new PublicKey(tokenAddressValue), 
                    new PublicKey(address), 
                    AuthorityType.MintTokens, 
                    null, 
                )
            );

            tx.recentBlockhash = latestBlockHash.blockhash;
            tx.feePayer = new PublicKey(address);

            
            const signature = await walletProvider.signAndSendTransaction(tx);

            // const signature = await walletProvider.sendTransaction(
            //     tx,
            //     connection
            // );

            toast.success('Success revoke mint authority', {
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
            <button className="btn btn-primary" onClick={handleClick}>Revoke Mint Authority</button>
            
            <ToastContainer /> 
        </>
    )
}