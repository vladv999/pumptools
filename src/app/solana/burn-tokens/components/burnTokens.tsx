'use client';

import { ToastContainer, toast } from 'react-toastify';
import { PublicKey, Transaction } from "@solana/web3.js";
import { getAssociatedTokenAddress, createBurnInstruction, getMint } from "@solana/spl-token";

import { useAppKit, useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { useAppKitConnection } from '@reown/appkit-adapter-solana/react';
import type { Provider } from "@reown/appkit-adapter-solana";
import { log } from 'console';

export default function BurnToken() {
    const { open } = useAppKit(); 
    const { address, isConnected } = useAppKitAccount();
    const { connection } = useAppKitConnection();
    
    const { walletProvider } = useAppKitProvider<Provider>("solana");

    async function handleClick(){

        if(!isConnected || !connection || !address){
            open({ view: "Connect" });
            return;
        }

        const tokenAddress = document.getElementById("burnTokenAddress") as HTMLInputElement;
        const tokenAddressValue = tokenAddress.value.trim();

        const tokenAmount = document.getElementById("burnTokenAmount") as HTMLInputElement;

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

        if(!tokenAmount.value || isNaN(parseInt(tokenAmount.value)) || parseInt(tokenAmount.value) <= 0) {
            toast.error('Please enter a valid token amount', {
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
            const tokenATA = await getAssociatedTokenAddress(new PublicKey(tokenAddressValue), new PublicKey(address));
            const mintInfo = await getMint(connection, new PublicKey(tokenAddressValue));
            
            const tx = new Transaction().add(
                createBurnInstruction(
                    tokenATA, // Associated Token Account
                    new PublicKey(tokenAddressValue), // Mint Address
                    new PublicKey(address), // Owner Address
                    Number(tokenAmount.value) * Math.pow(10, Number(mintInfo.decimals)) // Amount to Burn
                )
            );

            tx.recentBlockhash = latestBlockHash.blockhash;
            tx.feePayer = new PublicKey(address);

            
            const signature = await walletProvider.signAndSendTransaction(tx);

            // const signature = await walletProvider.sendTransaction(
            //     tx,
            //     connection
            // );

            toast.success('Success burn token', {
                position: "top-center",
                autoClose: 5000,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

        } catch (error) {
            console.log("Error creating transaction:", error);
            
            toast.error('Error create transaction, please check token address', {
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
            <button className="btn btn-primary" onClick={handleClick}>Burn Tokens</button>
            
            <ToastContainer /> 
        </>
    )
}