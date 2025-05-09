'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation'

import SolanaMenu from '../solana/menu';
import LogoImage from  "../../assets/images/logo/logo.svg" ;
import LogoImageWhite from  "../../assets/images/logo/logo-white.svg" ;
import LogoMini from  "../../assets/images/logo/chameleon.png" ;



export default function Sidebar() {
    
    const pathname = usePathname()

    function closeSidebar() {
        const sidebar = document.querySelector('.vertical-sidebar') as HTMLElement;
        sidebar.classList.remove("semi-nav");
    }
    return (
        <nav className="vertical-sidebar">
            <div className="app-logo">
                <a className="logo d-inline-block" href="/">
                    <img alt="Pump Tools" src={LogoImage.src} className='logo-black'/>
                    <img alt="Pump Tools" src={LogoImageWhite.src} className='logo-white'/>
                    <img alt="Pump Tools" src={LogoMini.src} className='logo-mini'/>
                </a>

                <span className="bg-light-primary toggle-semi-nav" onClick={closeSidebar}>
                    <i className="iconoir-xmark"></i>
                </span>
            </div>
            <div className="app-nav" id="app-simple-bar">
                <ul className="main-nav p-0 mt-2">
                    <li className="no-sub">
                        <Link href="/" { ...pathname === "/" ? {className: "active"} : {}}>
                            <i className="iconoir-home-alt"></i> Home
                        </Link>
                    </li>
                    
                    {/* Blockchain Menu */}
                    <SolanaMenu />

                    
                    <li className="menu-title">
                        <span>Info</span>
                    </li>
                    <li>
                        <a aria-expanded="false" className="" data-bs-toggle="collapse" href="#blockchains">
                            <i className="iconoir-network-right"></i>
                            Blockchains
                        </a>
                        <ul className="collapse" id="blockchains">
                            <li><Link href="/solana">Solana</Link></li>
                            <li><a href="">Base <span className="badge text-outline-success badge-notification ms-2 b-r-6">Coming Soon</span></a></li>
                            <li><a href="">Ethereum <span className="badge text-outline-success badge-notification ms-2 b-r-6">Coming Soon</span></a></li>
                            <li><a href="">Binanace <span className="badge text-outline-success badge-notification ms-2 b-r-6">Coming Soon</span></a></li>
                        </ul>
                    </li>
                    <li className="no-sub">
                        <a href="https://pump-tools.gitbook.io/pumptools/info/faq" target='_blank'>
                            <i className="iconoir-help-circle"></i> FAQ
                        </a>
                    </li>
                    <li className="no-sub">
                        <a href="https://pump-tools.gitbook.io/pumptools" target='_blank'>
                            <i className="iconoir-book"></i> Docs
                        </a>
                    </li>
                    <li className="no-sub">
                        <a href="https://t.me/pump_tools_support" target='_blank'>
                            <i className="iconoir-headset-help"></i> Support
                        </a>
                    </li>
                    
                    <li className="menu-title">
                        <span>Socials</span>
                    </li>
                    <li className="no-sub">
                        <a href="https://t.me/pump_tools_news" target='_blank'>
                            <i className="iconoir-telegram"></i> Telegram Channel
                        </a>
                    </li>
                    {/* <li className="no-sub">
                        <a href="https://www.youtube.com/@pump_tools"target='_blank'>
                            <i className="iconoir-youtube"></i> YouTube
                        </a>
                    </li> */}
                </ul>
            </div>

            <div className="menu-navs">
                <span className="menu-previous"><i className="ti ti-chevron-left"></i></span>
                <span className="menu-next"><i className="ti ti-chevron-right"></i></span>
            </div>

        </nav>
    )
}