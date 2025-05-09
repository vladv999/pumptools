import type { Metadata } from "next";
import RevokeMint from "./components/revokeMint";
import { siteName } from '../../../config/config'


export const metadata: Metadata = {
    title: siteName + " - Revoke Mint Authority",
    description: "Effortlessly manage your tokens by revoking Mint Authority, ensuring smooth control and uninterrupted usability.", 
    keywords: "Revoke Mint Authority, Solana, Token Management, Token Control, Token Usability",
};

export default function RevokeFreezeAuthority() {
    return (
        <main>
            <div className="container invoice-container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="d-block d-md-flex align-items-center">
                            <i className="iconoir-keyframes-minus"></i>
                            <span className="ms-2">Revoke Mint Authority</span>
                        </h1>
                        <h6>Easily revoke the Mint Authority of any Token you created.</h6>
                    

                        <div className="app-form white-form mb-4 mt-4">
                            <div className="mb-3">
                                <label htmlFor="revokeMintTokenAddress" className="form-label"><span className="red">*</span> Token Address</label>
                                <input type="text" className="form-control" id="revokeMintTokenAddress" placeholder="Enter token address" />
                            </div>
                            <RevokeMint />
                        </div>

                        <h2>How to use Revoke Mint Authority</h2>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <b>1.</b> Connect your Solana wallet 
                            </li>
                            <li className="list-group-item">
                                <b>2.</b> Enter the Token Address
                                <br/>
                                <span className="red">*</span> To Revoke the Mint Authority you should use the wallet that created that Token (Authority)
                            </li>
                            <li className="list-group-item">
                                <b>3.</b> Click on Revoke Mint Authority button
                            </li>
                            <li className="list-group-item">
                                <b>4.</b> Accept the Transaction
                            </li>
                            <li className="list-group-item">
                                <b>5.</b> Wait a second and the changes will be applied
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </main>
    );
}
