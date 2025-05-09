import type { Metadata } from "next";
import Link from "next/link";
import { siteName } from '../config/config'

import BestPriceImage from "../assets/images/best-price.png";
import SettingsImage from "../assets/images/settings.png";
import ChameleonImage from "../assets/images/logo/chameleon.png";

export const metadata: Metadata = {
    title: siteName + " - Token manager, create tokens, manage liquidity, distribute airdrops",
    description: "Create tokens, manage liquidity, distribute airdrops, and much more - all without writing a single line of code.",
    keywords: "create tokens, manage liquidity, distribute airdrops, token manager, no code, solana",
};

export default function Home() {
    return (
        <main className="home_page">
            <div className="container invoice-container">
                <h1 className="d-flex align-items-center hero_title">
                    <img src={ChameleonImage.src} height={'50'} className="me-2 d-none d-md-block"/> Pump Tools - Token manager
                </h1>
                <h6 className="hero_desc">Create tokens, manage liquidity, distribute airdrops, and much more - all without writing a single line of code.</h6>
            
                <div className="mt-4 mb-4 d-flex align-items-center">
                    <Link href="/solana/token-creator" className="btn btn-primary btn-xl d-flex align-items-center">
                        <i className="iconoir-coins me-2"></i> Create SPL token
                    </Link>
                </div>
                <div className="white-form mb-3">
                    <h3 className="mb-3 home_tools_title">Solana Tools</h3>
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
                            <Link href="/solana/burn-tokens" className="btn btn-primary btn-xs d-inline-flex align-items-center">
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
                
                <div className="white-form mb-3">
                    <h3 className="mb-3 home_tools_title">Base Tools</h3>
                    <div className="tool_coming_soon"><i className="iconoir-calendar me-2"></i> This functionality is still in development, it will appear on the site very soon.</div>
                </div>

                <div className="white-form mb-3">
                    <h3 className="mb-3 home_tools_title">Ethereum Tools</h3>
                    <div className="tool_coming_soon"><i className="iconoir-calendar me-2"></i> This functionality is still in development, it will appear on the site very soon.</div>
                </div>

                <div className="white-form mb-5">
                    <h3 className="mb-3 home_tools_title">Binance Tools</h3>
                    <div className="tool_coming_soon"><i className="iconoir-calendar me-2"></i> This functionality is still in development, it will appear on the site very soon.</div>
                </div>

                <div className="">
                    <h2>Create Tokens Easily, Quickly, and at an Affordable Price!</h2>
                    <p>Welcome to our service—a platform that allows anyone to issue tokens on <b>Solana, Ethereum, and Binance Smart Chain</b> without complex coding or high costs.</p>
                    <h3 className="mt-3">Why Choose Us?</h3>
                    <ul>
                        <li>🔹 <b>Token Creation Cost</b> – only <b>0.08 SOL</b>, plus a small transaction fee, making the total cost <b>≈0.1 SOL</b>. This is one of the most affordable solutions on the market!</li>
                        <li>🔹 <b>Free Features</b> – minting disable, freezing, and metadata updates are completely free. This means your token issuance will cost just <b>0.1 SOL</b>, which is significantly cheaper than competitors!</li>
                        <li>🔹 <b>More Affordable Than Other Services</b> – similar services charge up to <b>0.7 SOL</b>, while we offer the same for nearly 6 times less!</li>
                        <li>🔹 <b>Complete Control Over Your Token</b> – customize token parameters, manage updates, and enable freezing options. You decide how your digital asset will function.</li>
                        <li>🔹 <b>User-Friendly Experience</b> – an intuitive interface, convenient settings, and minimal steps required to launch your token. No technical skills needed!</li>
                    </ul>
                    <h3 className="mt-3">We Are Constantly Improving!</h3>
                    <p>We not only provide a powerful tool but also continuously add <b>new features</b> to make token creation even simpler and more efficient.</p>
                    <p>In the near future, we plan to:</p>
                    <ul>
                        <li>🔹 Enhance token management with additional customization options.</li>
                        <li>🔹 Expand support for new token standards.</li>
                        <li>🔹 Optimize fees for even greater cost savings.</li>
                    </ul>
                    <p>Our goal is to <b>make token creation accessible to everyone</b>, and we are committed to continuously improving our service!</p>
                    
                    <h3 className="mt-3">Join us and create your token today!</h3>
                    <p>If you need assistance or have ideas for improving our platform, we are always open to feedback! 🚀</p>

                </div> 
                            
            </div>
        </main>
    );
}
