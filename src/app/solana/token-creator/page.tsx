import type { Metadata } from "next";
import IconUpload from "../../components/iconUpload";
import CreateToken from "./components/createToken";
import SuccessModal from "./components/successModal";
import { siteName } from '../../../config/config'


export const metadata: Metadata = {
    title: siteName + " - Solana Token Creator",
    description: "Easily Create your own Solana SPL Token in just 1 steps without Coding.", 
    keywords: "Solana, Token, Creator, SPL, No Code, solana create token, solana token creator, solana token generator, solana token minting, solana token creation, solana token builder, solana token maker, solana token design, solana token development, solana token launchpad, solana token platform",
};

export default function TokenCreator() {


    return (
        <main>
            <div className="container invoice-container">
                <h1 className="d-block d-md-flex align-items-center">
                    <i className="iconoir-coins"></i> 
                    <span className="ms-2">Solana Token Creator</span>
                </h1>
                <h6>Easily Create your own Solana SPL Token in just 1 steps without Coding.</h6>
            
                <form id="solanaCreateTokenForm" className="app-form white-form mb-4 mt-4">
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label"><span className="red">*</span> Token Name (Max 30)*</label>
                            <input className="form-control" id="sol_crtt_name" name="name" placeholder="Ex. Solana" type="text" />
                            
                            <div className="mt-1">
                                <span className="text-danger validation_text" id="valid_error_name"></span>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label"><span className="red">*</span> Token Symbol (Max 10)*</label>
                            <input className="form-control" id="sol_crtt_symbol" name="symbol" placeholder="Ex. SOL" type="text" />
                            
                            <div className="mt-1">
                                <span className="text-danger validation_text" id="valid_error_symbol"></span>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label"><span className="red">*</span> Decimals</label>
                            <input className="form-control" id="sol_crtt_decimals" name="decimals" defaultValue={6} type="number" />
                            
                            <div className="mt-1">
                                <span className="text-danger validation_text" id="valid_error_decimals"></span>
                            </div>
                            <div className="form_description">Change the number of decimals for your token</div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label"><span className="red">*</span> Suply</label>
                            <input className="form-control" id="sol_crtt_suply" name="suply" defaultValue={1000000} type="number" />
                            
                            <div className="mt-1">
                                <span className="text-danger validation_text" id="valid_error_suply"></span>
                            </div>
                            <div className="form_description">The initial number of available tokens that will be created in your wallet</div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Description</label>
                            <textarea className="form-control" id="sol_crtt_description" name="description" placeholder="Ex: First community token on Solana.." rows={8}></textarea>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label"><span className="red">*</span> Icon</label>
                            <IconUpload/>

                            <div className="mt-1">
                                <span className="text-danger validation_text" id="valid_error_icon_upload"></span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card shadow-none">
                                <div className="card-body custom-selection address-content">
                                    <div className="position-relative">
                                        <label className="check-box">
                                            <input id="sol_crtt_rev_freeze" name="revoke_freeze" type="checkbox" />
                                            <span className="checkmark check-primary position-absolute"></span>
                                            <span className="ms-4 ps-2 fs-6">Revoke Freeze <span className="fee">Free</span></span>
                                        </label>
                                    </div>
                                    <div>
                                        <i className="iconoir-snow-flake icon-bg"></i>
                                        <p className="text-muted">No one will be able to freeze holders' token accounts anymore</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card shadow-none">
                                <div className="card-body custom-selection address-content">
                                    <div className="position-relative">
                                        <label className="check-box">
                                            <input id="sol_crtt_rev_mint" name="revoke_mint" type="checkbox" />
                                            <span className="checkmark check-primary position-absolute"></span>
                                            <span className="ms-4 ps-2 fs-6">Revoke Mint <span className="fee">Free</span></span>
                                        </label>
                                    </div>
                                    <div>
                                        <i className="iconoir-database-xmark icon-bg"></i>
                                        <p className="text-muted">No one will be able to create more tokens anymore</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card shadow-none">
                                <div className="card-body custom-selection address-content">
                                    <div className="position-relative">
                                        <label className="check-box">
                                            <input id="sol_crtt_rev_update" name="revoke_update" type="checkbox" />
                                            <span className="checkmark check-primary position-absolute"></span>
                                            <span className="ms-4 ps-2 fs-6">Revoke Update <span className="fee">Free</span></span>
                                        </label>
                                    </div>
                                    <div>
                                        <i className="iconoir-edit-pencil icon-bg"></i>
                                        <p className="text-muted">No one will be able to modify token metadata anymore</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <CreateToken/>
                </form>

                <h2>How to use Solana Token Creator</h2>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <b>1.</b> Connect your Solana wallet 
                    </li>
                    <li className="list-group-item">
                        <b>2.</b> Write the name you want for your Token
                    </li>
                    <li className="list-group-item">
                        <b>3.</b> Indicate the symbol (max 10 characters)
                    </li>
                    <li className="list-group-item">
                        <b>4.</b> Select the decimals quantity (default 6)
                    </li>
                    <li className="list-group-item">
                        <b>5.</b> Put the Supply of your Token (default 1,000,000)
                    </li>
                    <li className="list-group-item">
                        <b>6.</b> Write the description you want for your SPL Token 
                    </li>
                    <li className="list-group-item">
                        <b>7.</b> Upload the image for your token (PNG, JPG, JPEG, max 2 MB)
                    </li>
                    <li className="list-group-item">
                        <b>8.</b> Click on create, accept the transaction and wait until your token is ready
                    </li>
                </ul>
            </div>

          <SuccessModal />

        </main>
    );
}
