'use client';
import Link from "next/link";
import { usePathname } from 'next/navigation'

export default function SolanaMenu() {
    const pathname = usePathname();

    return (
        <>
            <li className="menu-title">
                <span>Token</span>
            </li>
            <li className="no-sub">
                <Link href="/solana/token-creator"  { ...pathname === "/solana/token-creator" ? {className: "active"} : {}}>
                    <i className="iconoir-coins"></i> Token creator
                </Link>
            </li>
            <li>
                <a aria-expanded="false" className="" data-bs-toggle="collapse" href="#authorities">
                    <i className="iconoir-keyframes-minus"></i>
                    Revoke Authorities
                </a>
                <ul className="collapse" id="authorities">
                    <li><Link href="/solana/revoke-freeze-authority">Revoke Freeze Authority</Link></li>
                    <li><Link href="/solana/revoke-mint-authority">Revoke Mint Authority</Link></li>
                    <li><Link href="/solana/revoke-update-authority">Revoke Update Authority</Link></li>
                </ul>
            </li>
            <li className="no-sub">
                <Link href="/solana/mint-tokens" { ...pathname === "/solana/mint-tokens" ? {className: "active"} : {}}>
                    <i className="iconoir-keyframe-plus"></i> Mint Tokens
                </Link>
            </li>
            <li className="no-sub">
                <Link href="/solana/burn-tokens" { ...pathname === "/solana/burn-tokens" ? {className: "active"} : {}}>
                    <i className="iconoir-fire-flame"></i> Burn Tokens
                </Link>
            </li>
            <li className="no-sub">
                <Link href="/solana/update-metadata" { ...pathname === "/solana/update-metadata" ? {className: "active"} : {}}>
                    <i className="iconoir-media-image"></i> Update Metadata
                </Link>
            </li>
            <li className="no-sub">
                <Link href=""  { ...pathname === "/solana/create-liquidity-pool" ? {className: "active"} : {}}>
                    <i className="iconoir-reports"></i> Liquidity Pool
                    <span className="badge text-outline-success badge-notification ms-2 b-r-6">Soon</span>
                </Link>
            </li>
            <li className="no-sub">
                <a href="#">
                    <i className="iconoir-airplane"></i> Airdrop Tokens
                    <span className="badge text-outline-success badge-notification ms-2 b-r-6">Soon</span>
                </a>
            </li>
        </>
    )
}