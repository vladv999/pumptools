'use client';

import Link from 'next/link'
import { useEffect } from "react";
import { usePathname } from 'next/navigation';
import WalletConnect from './walletConnect'
import SolanaLogo from "../../assets/images/logo/crypto/solana.svg";
import EthereumLogo from "../../assets/images/logo/crypto/ethereum.svg";
import BscLogo from "../../assets/images/logo/crypto/bsc.svg";
import BaseLogo from "../../assets/images/logo/crypto/base.png";

export default function Header() {
    const pathname = usePathname();
    const splitPath = pathname.split("/").filter((path) => path !== "");

    
    

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            document.body.classList.add("dark")
            document.body.classList.remove("light")
        }else{
            document.body.classList.remove("dark")
            document.body.classList.add("light")
        }

        const sidebarPosition = localStorage.getItem("sidebar");
        const sidebar = document.querySelector('.vertical-sidebar') as HTMLElement;
        if (sidebarPosition === "semi-nav") {
            sidebar.classList.add("semi-nav")
        }else{
            sidebar.classList.remove("semi-nav")
        }
    }, []);


    function toggleSidebar(){
        const sidebar = document.querySelector('.vertical-sidebar') as HTMLElement;
        if(sidebar.classList.contains("semi-nav")){
            sidebar.classList.remove("semi-nav");
            localStorage.setItem("sidebar", "");
        }else{
            sidebar.classList.add("semi-nav");
            localStorage.setItem("sidebar", "semi-nav");
        }
    }

    function toggleDarkMode(){
        const sunLogo = document.querySelector(".sun-logo");
        if (sunLogo) {
            sunLogo.classList.toggle("sun");
        }
        const moonLogo = document.querySelector(".moon-logo");
        if (moonLogo) {
            moonLogo.classList.toggle("moon");
        }

        const body = document.querySelector("body");
        
        if (body?.classList.contains("dark")) {
            document.body.classList.remove("dark")
            document.body.classList.add("light")

            localStorage.setItem("theme", "light");
            
        } else {
            document.body.classList.remove("light")
            document.body.classList.add("dark")

            localStorage.setItem("theme", "dark");
        }
    }

    return (
        <header className="header-main">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-6 col-sm-4 d-flex align-items-center header-left p-0">
                        <span className="header-toggle me-3" onClick={toggleSidebar}>
                            <i className="iconoir-view-grid"></i>
                        </span>
                    </div>

                    <div className="col-6 col-sm-8 d-flex align-items-center justify-content-end header-right p-0">

                        <ul className="d-flex align-items-center">
                            <li className="header-dark me-0 me-md-4" onClick={toggleDarkMode}>
                                <div className="sun-logo head-icon">
                                    <i className="iconoir-sun-light"></i>
                                </div>
                                <div className="moon-logo head-icon">
                                    <i className="iconoir-half-moon"></i>
                                </div>
                            </li>
                            <li className="header-language">
                                <div className="flex-shrink-0 dropdown" id="lang_selector">
                                    <a aria-expanded="false" className="d-block head-icon ps-0"
                                        data-bs-toggle="dropdown"
                                        href="#">
                                        <div className="lang-flag">
                                            <span className="flag rounded-circle overflow-hidden">
                                                {
                                                    splitPath[0] === undefined ? 
                                                    <div className='lfg_item head_choose_net ms-2 ms-md-0'>
                                                        <i className="iconoir-network-right"></i>
                                                        <span className="lfg_name ms-2">Choose Newtwork</span>
                                                    </div> 
                                                    : null
                                                }
                                                {
                                                    splitPath[0] === "solana" ? 
                                                    <div className='lfg_item head_choose_net_imaged ms-2 ms-md-0' style={{background: "#333333"}}>
                                                        <img src={SolanaLogo.src} width="28px" height="28px"/>
                                                        <span className="lfg_name ms-2">Solana</span>
                                                    </div> 
                                                    : null
                                                }
                                            </span>
                                        </div>
                                    </a>
                                    <ul className="dropdown-menu language-dropdown header-card border-0 b-r-6">
                                        <li className="lang lang-en selected dropdown-item p-2">
                                            <Link href='/solana' className="d-flex align-items-center">
                                                <img src={SolanaLogo.src} width="28px" height="28px"/>
                                                <span className="ps-2">Solana</span>
                                            </Link>
                                        </li>
                                        <li className="lang lang-en selected dropdown-item p-2">
                                            <Link href='' className="d-flex align-items-center">
                                                <img src={BaseLogo.src} width="28px" height="28px"/>
                                                <span className="ps-2">Base</span>
                                                <span className="badge text-outline-success ms-2 b-r-6">Soon</span>
                                            </Link>
                                        </li>
                                        <li className="lang lang-en selected dropdown-item p-2">
                                            <Link href='' className="d-flex align-items-center">
                                                <img src={EthereumLogo.src} width="28px" height="28px"/>
                                                <span className="ps-2">Ethereum</span>
                                                <span className="badge text-outline-success ms-2 b-r-6">Soon</span>
                                            </Link>
                                        </li>
                                        <li className="lang lang-en selected dropdown-item p-2">
                                            <Link href='' className="d-flex align-items-center">
                                                <img src={BscLogo.src} width="28px" height="28px"/>
                                                <span className="ps-2">Binance</span>
                                                <span className="badge text-outline-success ms-2 b-r-6">Soon</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>

                            </li>
                            <li className="header-profile ms-2">
                                <WalletConnect />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
}