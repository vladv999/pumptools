import type { Metadata } from "next";
import RevokeUpdate from "./components/revokeUpdate";
import { siteName } from '../../../config/config'


export const metadata: Metadata = {
    title: siteName + " - Revoke Update Authority",
    description: "Effortlessly manage your tokens by revoking Update Authority, ensuring smooth control and uninterrupted usability.", 
    keywords: "Revoke Update Authority, Solana, Token Management, Token Control, Token Usability",
};

export default function RevokeUpdateAuthority() {
    return (
        <main>
            <div className="container invoice-container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="d-block d-md-flex align-items-center">
                            <i className="iconoir-keyframes-minus"></i>
                            <span className="ms-2">Revoke Update Authority</span>
                        </h1>
                        <h6>Easily revoke the Update Authority of any Token you created.</h6>
                

                        <div className="app-form white-form mb-4 mt-4">
                            <div className="mb-3">
                                <label htmlFor="revokeUpdateTokenAddress" className="form-label"><span className="red">*</span> Token Address</label>
                                <input type="text" className="form-control" id="revokeUpdateTokenAddress" placeholder="Enter token address" />
                            </div>
                            <RevokeUpdate />
                        </div>

                        <h2>How to use Revoke Update Authority</h2>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <b>1.</b> Connect your Solana wallet 
                            </li>
                            <li className="list-group-item">
                                <b>2.</b> Enter the Token Address
                                <br/>
                                <span className="red">*</span> To Revoke the Update Authority you should use the wallet that created that Token (Authority)
                            </li>
                            <li className="list-group-item">
                                <b>3.</b> Click on Revoke Update Authority button
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
