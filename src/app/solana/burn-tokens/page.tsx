import type { Metadata } from "next";
import BurnToken from "./components/burnTokens";
import { siteName } from '../../../config/config'


export const metadata: Metadata = {
    title: siteName + " - Burn Tokens",
    description: 'Easily reduce the supply of solana token. Burn a certain number of tokens without coding.',
    keywords: 'Solana, Token, Burn, Burn Solana Token, Token Creator',
};

export default function BurnTokens() {
    return (
        <main>
            <div className="container invoice-container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="d-block d-md-flex align-items-center">
                            <i className="iconoir-fire-flame"></i>
                            <span className="ms-2">Burn Token</span>
                        </h1>
                        <h6>Easily Burn Supply of your Solana Token.</h6>
        

                        <div className="app-form white-form mb-4 mt-4">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="burnTokenAddress" className="form-label"><span className="red">*</span> Token Address</label>
                                        <input type="text" className="form-control" id="burnTokenAddress" placeholder="Enter token address" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="burnTokenAmount" className="form-label"><span className="red">*</span> How much supply you want to burn</label>
                                        <input type="text" className="form-control" id="burnTokenAmount" placeholder="100000" />
                                    </div>
                                </div>
                            </div>
                            <BurnToken />
                        </div>

                        <h2>How to use Burn Tokens Tool</h2>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <b>1.</b> Connect your Solana wallet 
                            </li>
                            <li className="list-group-item">
                                <b>2.</b> Enter the Token Address
                                <br/>
                                <span className="red">*</span> To burn tokens you must have the Mint Authority role
                            </li>
                            <li className="list-group-item">
                                <b>4.</b> Enter the quantity you want to burn
                            </li>
                            <li className="list-group-item">
                                <b>3.</b> Click on Burn Tokens button
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
