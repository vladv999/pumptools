import type { Metadata } from "next";
import Form from "./components/form";

export const metadata: Metadata = {
    title: "Create Solana Liquidity Pool",
    description: "Create a liquidity pool for trading and visibility on platforms such as Raydium, Birdeye, DexScreener, and DexTools. 🚀", 
    keywords: "solana, liquidity pool, create liquidity pool, raydium, birdeye, dexscreener, dextools",
};

export default function CreateLiquidityPool() {



    return (
        <main>
            <div className="container invoice-container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h1 className="d-flex align-items-center">
                                    <i className="iconoir-reports"></i> 
                                    <span className="ms-2">Create Solana Liquidity Pool</span>
                                </h1>
                            </div>
                            <div className="card-body">
                                <h6>Create a liquidity pool for trading and visibility on platforms such as Raydium, Birdeye, DexScreener and DexTools. 🚀</h6>
                                <p className="text-secondary">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam blanditiis saepe maiores quos dolorum. Ratione esse ipsam porro, libero, recusandae aliquid laborum quo, cupiditate vel qui aspernatur nulla explicabo perferendis.
                                </p>

                                <Form />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
