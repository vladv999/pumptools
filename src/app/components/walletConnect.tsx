'use client';
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";

export default function WalletConnect() {

    const { open } = useAppKit(); 
    const { address, isConnected } = useAppKitAccount();

    function openModal(){
        if(isConnected){
            open({ view: "Account" });
        }else{
            open({ view: "Connect" });
        }
    }

    return (
        <>
            <button className="btn btn-primary wallet_desktop" onClick={openModal}>
                <i className="iconoir-wallet"></i> 
                <span className='ms-2'>{address ? address.substring(0, 12).trimEnd() + '...' : 'Connect Wallet'}</span>
            </button>
            <button className="btn btn-primary icon-btn b-r-4 wallet_mobile" onClick={openModal}>
                <i className="iconoir-wallet"></i> 
            </button>
        
        </>
    )

}