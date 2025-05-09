'use client';

import { useAppKit, useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { useAppKitConnection } from '@reown/appkit-adapter-solana/react';
import type { Provider } from "@reown/appkit-adapter-solana";
import { PublicKey, Connection } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import React, {useState, useEffect, use} from "react";
import { Metadata, PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata";
import * as config from '../../config'

import SolanaLogo from "../../../../assets/images/logo/crypto/solana.png";  


export default function TokenList({ tokenType }: { tokenType: string }) {
    const { open, close } = useAppKit(); 
    const { address, isConnected, caipAddress, status, embeddedWalletInfo } = useAppKitAccount();
    const { connection } = useAppKitConnection();
    const { walletProvider } = useAppKitProvider<Provider>("solana");

    interface Token {
        image: string;
        name: string;
        symbol: string;
        address: string;
    }

    const [tokenBalance, setTokenBalance] = useState<number>(0);

    const [findToken, setFindToken] = useState<Token | null>(null);
    const [inputArea, setInputArea] = useState<string>('');

    let rpcUrl = config.NETWORK_URL_DEVNET;
    if (config.NETWORK_TYPE === 'mainnet-beta') {
        rpcUrl = config.NETWORK_URL_MAINNET;
    }

    const connectionRpc = new Connection(rpcUrl);


    async function getTokenData(tokenAddress: string) {
        let trimAddress = tokenAddress.trim();
        trimAddress = tokenAddress.replace(/\s+/g, '');
        setInputArea(trimAddress);

        try {
            setFindToken(null);

            const [metadataPDA] = PublicKey.findProgramAddressSync(
                [Buffer.from("metadata"), PROGRAM_ID.toBuffer(), new PublicKey(trimAddress).toBuffer()],
                PROGRAM_ID
            );
              
            const tokenData = await Metadata.fromAccountAddress(connectionRpc, metadataPDA);
            let token = await (await fetch(tokenData.data.uri)).json();
            token.address = trimAddress;

            setFindToken(token);
            
            
        } catch (error) {
            console.error("Error fetching token data:", error);
        }
    }

    function choseToken(addressToken: string, name: string, symbol: string, image: string) {
        return async () => {
            
            setTokenBalance(0);

            if(!address || !connection) return;

            const ownerTokenAccount = await connection.getParsedTokenAccountsByOwner(new PublicKey(address), {
                mint: new PublicKey(addressToken),
            });
            
            if (ownerTokenAccount.value.length > 0) {
                setTokenBalance(ownerTokenAccount.value[0].account.data.parsed.info.tokenAmount.uiAmount);
            }else {
                console.log("Token account not found for the given address.");
            }

            const tokenName = document.getElementById('lqab_'+tokenType+'_name') as HTMLInputElement;
            tokenName.innerHTML = name;

            const tokenSymbol = document.getElementById('lqab_'+tokenType+'_symbol') as HTMLInputElement;
            tokenSymbol.innerHTML = symbol;

            const tokenAddress = document.getElementById('lqab_'+tokenType+'_address') as HTMLInputElement;
            tokenAddress.innerHTML = addressToken;

            const tokenAvatar= document.getElementById('lq_amount_avtr_'+tokenType) as HTMLInputElement;
            tokenAvatar.src = image;

            const tokenInput = document.getElementById(tokenType+'_token') as HTMLInputElement;
            tokenInput.value = addressToken;

            const tokenBalanceSpan = document.getElementById('lqab_'+tokenType+'_balance') as HTMLInputElement;
            tokenBalanceSpan.innerHTML = tokenBalance.toFixed(6);

            closeModal();
        };

    }
    

    function openModal() {
        if(!isConnected || !connection || !address){
            open({ view: "Connect" });
            return;
        }
        
        const modal = document.getElementById('selectToken_'+tokenType+'_modal') as HTMLDivElement;
        const modal_layout = document.querySelector(".modal_layout") as HTMLDivElement;
        modal.style.display = "block";
        modal_layout.style.display = "block";
    }

    function closeModal() {
        const modals = document.querySelectorAll(".modal_es");
        modals.forEach((modal) => {
            (modal as HTMLDivElement).style.display = "none";
        });
        const modal_layout = document.querySelectorAll(".modal_layout");
        modal_layout.forEach((element) => {
            (element as HTMLDivElement).style.display = "none";
        });
    }

    return (
        <>
            <label className="form-label"><span className="red">*</span> {tokenType === 'base' ? 'Base' : 'Quote'} Token</label>
            <div className="input-group mb-3">
                <span className="input-group-text b-r-left bg-light-primary b-1-primary" id="basic-addon1">
                    <i className="iconoir-search"></i>
                </span>
                <input id={tokenType+'_token'} onClick={openModal} className="form-control b-r-right" placeholder="Select token" type="text" />
            </div>

            <div id={'selectToken_'+tokenType+'_modal'} className="modal_es">
                <div className="modal_es_header">
                    <h4> Select Token</h4>
                    <button type="button" onClick={closeModal} className="top_modal_close"><i className="iconoir-xmark-square"></i></button>
                </div>
                <div className="modal_es_body">
                    <div className="mb-3">
                        <input className="form-control" onChange={(e) => getTokenData(e.target.value)} placeholder="Enter token address" type="text" />
                    </div>
                    <div className="tokens_list">
                        {
                            !findToken
                            ? 
                                inputArea != ''
                                ? <div className="text-center mb-3">This token not found</div>
                                : ''
                            : 
                            <div className="token_item d-flex align-items-center" onClick={
                                choseToken(
                                    findToken.address,
                                    findToken.name,
                                    findToken.symbol,
                                    findToken.image
                                )
                            }>
                                <div className="token_image me-2">
                                    <div className="h-45 w-45 d-flex-center b-r-50 overflow-hidden text-bg-primary">
                                        <img alt="avtar" className="img-fluid" src={findToken.image} />
                                    </div>
                                </div>
                                <div className="token_body">
                                    <h6 className="mb-0">{findToken.name} (WSOL)</h6>
                                    <p className="mb-0 mini_address">{findToken.address}</p>
                                </div>
                            </div>
                            
                        }
                        <div className="token_item d-flex align-items-center" onClick={
                                choseToken(
                                    'So11111111111111111111111111111111111111112',
                                    'Wrapped SOL',
                                    'WSOL',
                                    SolanaLogo.src
                                )
                        }>
                            <div className="token_image me-2">
                                <div className="h-45 w-45 d-flex-center b-r-50 overflow-hidden text-bg-primary">
                                    <img alt="avtar" className="img-fluid" src={SolanaLogo.src} />
                                </div>
                            </div>
                            <div className="token_body">
                                <h6 className="mb-0">Wrapped SOL (WSOL)</h6>
                                <p className="mb-0 mini_address">So11111111111111111111111111111111111111112</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}