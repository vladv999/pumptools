import type { Metadata } from "next";
import MintToken from "./components/mintToken";
import { siteName } from '../../../config/config'


export const metadata: Metadata = {
    title: siteName + " - Mint Tokens",
    description: "Easily manage your tokens on Solana with our user-friendly interface. Create, mint, and revoke authorities effortlessly.",
    keywords: "Solana, Token, Mint, Mint Solana Token, Revoke Authority, Token Creator",
};

export default function MintTokens() {
    return (
        <main>
            <div className="container invoice-container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="d-block d-md-flex align-items-center">
                            <i className="iconoir-keyframe-plus"></i>
                            <span className="ms-2">Mint Token</span>
                        </h1>
                        <h6>Easily Mint more Supply of your Solana Token.</h6>
        

                        <div className="app-form white-form mb-4 mt-4">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="mintTokenAddress" className="form-label"><span className="red">*</span> Token Address</label>
                                        <input type="text" className="form-control" id="mintTokenAddress" placeholder="Enter token address" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="mintTokenAmount" className="form-label"><span className="red">*</span> How much supply you want to mint</label>
                                        <input type="text" className="form-control" id="mintTokenAmount" placeholder="100000" />
                                    </div>
                                </div>
                            </div>
                            <MintToken />
                        </div>

                        <h2>How to use Mint Tokens Tool</h2>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <b>1.</b> Connect your Solana wallet 
                            </li>
                            <li className="list-group-item">
                                <b>2.</b> Enter the Token Address
                                <br/>
                                <span className="red">*</span> To mint more you should use the wallet that created the Token (Authority)
                            </li>
                            <li className="list-group-item">
                                <b>3.</b> Enter the quantity you want to mint
                            </li>
                            <li className="list-group-item">
                                <b>4.</b> Click on Mint Tokens button
                            </li>
                            <li className="list-group-item">
                                <b>5.</b> Accept the Transaction
                            </li>
                            <li className="list-group-item">
                                <b>6.</b> Wait a second and the changes will be applied
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </main>
    );
}
