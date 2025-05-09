'use client';

import { ToastContainer, toast } from 'react-toastify';
import { PublicKey, Transaction, Connection } from "@solana/web3.js";
import { getAssociatedTokenAddress, createMintToCheckedInstruction } from "@solana/spl-token";

import { useAppKit, useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { useAppKitConnection } from '@reown/appkit-adapter-solana/react';
import type { Provider } from "@reown/appkit-adapter-solana";

export default function MintToken() {
    const { open, close } = useAppKit(); 
    const { address, isConnected, caipAddress, status, embeddedWalletInfo } = useAppKitAccount();
    const { connection } = useAppKitConnection();
    
    const { walletProvider } = useAppKitProvider<Provider>("solana");

    async function handleClick(){

        if(!isConnected || !connection || !address){
            open({ view: "Connect" });
            return;
        }

        const tokenAddress = document.getElementById("mintTokenAddress") as HTMLInputElement;
        const tokenAddressValue = tokenAddress.value.trim();

        const tokenAmount = document.getElementById("mintTokenAmount") as HTMLInputElement;

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
            const tokenATA= await getAssociatedTokenAddress(new PublicKey(tokenAddressValue), new PublicKey(address));
            const tokenInfo = await connection.getParsedAccountInfo(new PublicKey(tokenAddressValue));
            
            if (tokenInfo.value === null || !('parsed' in tokenInfo.value.data)) {
                toast.error('Token address is invalid', {
                    position: "top-center",
                    autoClose: 5000,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                return;
            }

            const tx = new Transaction().add(
                createMintToCheckedInstruction(
                    new PublicKey(tokenAddressValue),
                    tokenATA,
                    new PublicKey(address),
                    Number(tokenAmount.value) * Math.pow(10, Number(tokenInfo.value.data.parsed.info.decimals)),
                    Number(tokenInfo.value.data.parsed.info.decimals),
                ),
            );


            tx.recentBlockhash = latestBlockHash.blockhash;
            tx.feePayer = new PublicKey(address);

            
            const signature = await walletProvider.signAndSendTransaction(tx);

            // const signature = await walletProvider.sendTransaction(
            //     tx,
            //     connection
            // );

            toast.success('Success mint token', {
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
            <button className="btn btn-primary" onClick={handleClick}>Mint Tokens</button>
            
            <ToastContainer /> 
        </>
    )
}