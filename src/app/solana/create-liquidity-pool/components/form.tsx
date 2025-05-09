'use client';
import { useAppKit, useAppKitAccount, useAppKitProvider } from "@reown/appkit/react";
import { useAppKitConnection } from '@reown/appkit-adapter-solana/react';
import type { Provider } from "@reown/appkit-adapter-solana";
import { PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import React, {useState, useEffect, use} from "react";
import TokenList from "./tokenList";
import LiquidityAmount from "./liquidityAmount";

export default function Form() {
    const { open, close } = useAppKit(); 
    const { address, isConnected, caipAddress, status, embeddedWalletInfo } = useAppKitAccount();
    const { connection } = useAppKitConnection();
    const { walletProvider } = useAppKitProvider<Provider>("solana");

    const [token, setToken] = useState('');

    async function getTokenData(tokenAddress: string) {
        if (!isConnected || !connection || !address) return;

        const tokenData = await connection.getParsedAccountInfo(new PublicKey(tokenAddress));
        console.log(tokenData);
        
        
    }

    return (
        <form className="app-form mt-4 border-top pt-4 pb-5">
            <div className="form-selectgroup">
                <label className="select-items">
                    <input className="select-input" name="select-options" type="radio" defaultChecked={true}/>
                    <span className="select-box">
                        <span className="selectitem" style={{fontSize: "18px"}}>
                            Raydium V4
                        </span>
                    </span>
                </label>
                <label className="select-items ms-3">
                    <input className="select-input" name="select-options" type="radio" />
                    <span className="select-box">
                        <span className="selectitem" style={{fontSize: "18px"}}>
                            Raydium V3 CPMM
                        </span>
                    </span>
                </label>
            </div>
            <div className="row mt-3">
                <div className="col-md-6">
                    <div className="mb-3">
                        <TokenList tokenType={'base'} />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="mb-3">
                        <TokenList tokenType={'quote'} />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <LiquidityAmount tokenType={'base'} />
                </div>
                <div className="col-md-6">
                    <LiquidityAmount tokenType={'quote'} />
                </div>
            </div>
        </form>
    )
}