import type { Metadata } from "next";
import Link from "next/link";
import { siteName } from '../../config/config'

import BestPriceImage from "../../assets/images/best-price.png";
import SettingsImage from "../../assets/images/settings.png";
import ChameleonImage from "../../assets/images/logo/chameleon.png";
import SoalanaLogo from "../../assets/images/logo/crypto/solana.svg";

export const metadata: Metadata = {
    title: siteName + " - Token manager, create tokens, manage liquidity, distribute airdrops",
    description: "Create tokens, manage liquidity, distribute airdrops, and much more - all without writing a single line of code.",
    keywords: "create tokens, manage liquidity, distribute airdrops, token manager, no code, solana",
};

export default function Solana() {
    return (
        <main className="home_page">
            <div className="container invoice-container">
                <h1 className="d-flex align-items-center hero_title">
                    <img src={SoalanaLogo.src} height={'50'} width={'50'} className="me-2 d-none d-md-block"/> Solana Tools
                </h1>
                <h6 className="hero_desc">Create tokens, manage liquidity, distribute airdrops, and much more - all without writing a single line of code.</h6>
            
                <div className="white-form mb-3 mt-4">
                    <div className="row">
                        <div className="col-md-4 mb-4">
                            <h4 className="d-flex align-items-center"><i className="iconoir-coins me-2"></i> Token Creation</h4>
                            <p>Create your own token in minutes.</p>
                            <Link href="/solana/token-creator" className="btn btn-primary btn-xs d-inline-flex align-items-center">
                                <i className="iconoir-arrow-right me-2"></i> Create
                            </Link>
                        </div>
                        <div className="col-md-4 mb-4">
                            <h4 className="d-flex align-items-center"><i className="iconoir-keyframes-minus me-2"></i> Revoke Authorities</h4>
                            <p>Revoke mint, freeze or update authority.</p>
                            <div className="d-flex flex-wrap align-items-center gap-2">
                                <Link href="/solana/revoke-freeze-authority" className="btn btn-primary btn-xs d-inline-flex align-items-center">
                                    <i className="iconoir-arrow-right me-2"></i> Freeze
                                </Link>
                                <Link href="/solana/revoke-mint-authority" className="btn btn-primary btn-xs d-inline-flex align-items-center">
                                    <i className="iconoir-arrow-right me-2"></i> Mint
                                </Link>
                                <Link href="/solana/revoke-update-authority" className="btn btn-primary btn-xs d-inline-flex align-items-center">
                                    <i className="iconoir-arrow-right me-2"></i> Update
                                </Link>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <h4 className="d-flex align-items-center"><i className="iconoir-coins me-2"></i> Mint Token</h4>
                            <p>Easily Mint more Supply of your Token.</p>
                            <Link href="/solana/mint-tokens" className="btn btn-primary btn-xs d-inline-flex align-items-center">
                                <i className="iconoir-arrow-right me-2"></i> Mint
                            </Link>
                        </div>
                        <div className="col-md-4 mb-4">
                            <h4 className="d-flex align-items-center"><i className="iconoir-fire-flame me-2"></i> Burn Tokens</h4>
                            <p>Easily reduce the supply of solana token.</p>
                            <Link href="/solana/burn-tokens" className="btn btn-primary btn-xs d-inline-flex align-items-center">
                                Burn
                            </Link>
                        </div>
                        <div className="col-md-4 mb-4">
                            <h4 className="d-flex align-items-center"><i className="iconoir-media-image me-2"></i> Update Metadata</h4>
                            <p>Easily Update Metadata in your Token.</p>
                            <Link href="/solana/update-metadata" className="btn btn-primary btn-xs d-inline-flex align-items-center">
                                Update
                            </Link>
                        </div>
                        <div className="col-md-4 mb-4">
                            <h4 className="d-flex align-items-center"><i className="iconoir-reports me-2"></i> Liquidity Management</h4>
                            <p>Manage your liquidity with ease.</p>
                            <Link href="" className="btn btn-outline-success btn-xs d-inline-flex align-items-center">
                                Comming Soon
                            </Link>
                        </div>
                        <div className="col-md-4 mb-4">
                            <h4 className="d-flex align-items-center"><i className="iconoir-airplane me-2"></i> Airdrop Distribution</h4>
                            <p>Distribute airdrops to your community.</p>
                            <Link href="" className="btn btn-outline-success btn-xs d-inline-flex align-items-center">
                                Comming Soon
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="hero_laps mb-3">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="best_price d-flex align-items-center mb-3 m-md-0">
                                <img className="best_price_img" src={BestPriceImage.src} alt="" />
                                <div>
                                    <h2>Best Price</h2>
                                    <p className="best_price_title_text">Create a token for only 0.1 SOL</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="best_price free_addons d-flex align-items-center">
                                <img className="best_price_img" src={SettingsImage.src} alt="" />
                                <div>
                                    <h2>Free addons</h2>
                                    <p className="best_price_title_text">Free authorities, mint and other</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>      

                <div className="mt-5">
                    <h2>Create Your Own Token on Solana for Just 0.1 SOL</h2>
                    <p>Launch your own SPL token on the Solana blockchain for only 0.1 SOL — fast, secure, and no coding required. Our platform provides a simple interface to create and manage your token in just a few clicks.</p>
                    
                    <h3 className="mt-3">Token Creation:</h3>
                    <p>Easily generate your SPL token with a custom name, symbol, and total supply — in seconds.</p>

                    <h3 className="mt-3">Free Extra Features:</h3>
                    <ul>
                        <li>🔹 <b>Token Mint:</b> Issue additional tokens anytime, directly to your wallet.</li>
                        <li>🔹 <b>Token Burn:</b> Reduce total supply by burning tokens from circulation.</li>
                        <li>🔹 <b>Revoke Authorities:</b> Ensure token security by revoking Mint, Freeze, or Update Metadata authorities.</li>
                        <li>🔹 <b>Update Metadata:</b> Modify your token’s name, symbol, logo, or other details whenever needed.</li>
                        <li>🔹 <b>Liquidity Management:</b> Tools to help you add liquidity on decentralized exchanges.</li>
                        <li>🔹 <b>Airdrop Distribution:</b> Distribute your tokens to community members, investors, or custom address lists via airdrop.</li>
                    </ul>
                    
                    <h3 className="mt-3">Why Choose Us:</h3>
                    <ul>
                        <li>🔹 No coding skills needed — everything through a user-friendly interface.</li>
                        <li>🔹 Instant token deployment on the Solana blockchain.</li>
                        <li>🔹 Transparent pricing — only 0.08 SOL + transaction fee</li>
                    </ul>
                    <p><b>Create, manage, and grow your token project on Solana — all in one place!</b></p>
                </div> 
            </div>
        </main>
    );
}
