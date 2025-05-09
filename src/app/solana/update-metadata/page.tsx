import type { Metadata } from "next";
import UpdateMetadata from './components/updateMetadata';
import IconUpload from "../../components/iconUpload";
import { siteName } from '../../../config/config'


export const metadata: Metadata = {
    title: siteName + " - Solana Token Update Metadata",
    description: "Easily Update Metadata in your Solana SPL Token in just 1 steps without Coding.",
    keywords:"solana, token, creator, create, mint, burn, airdrop, update metadata",
};

export default function MetadataUpate() {
    return (
        <main>
            <div className="container invoice-container">
                <h1 className="d-block d-md-flex align-items-center">
                    <i className="iconoir-coins"></i> 
                    <span className="ms-2">Update Metadata</span>
                </h1>
                <h6>Easily Update Metadata in your Solana SPL Token in just 1 steps without Coding.</h6>
            
                <form id="solanaUpdateMetadataForm" className="app-form white-form mb-4 mt-4">
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <label className="form-label"><span className="red">*</span> Token Address</label>
                            <input className="form-control" id="sol_upmd_token_address" name="token_address" placeholder="Enter token address" type="text" />
                            
                            <div className="mt-1">
                                <span className="text-danger validation_text" id="valid_error_token_address"></span>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label"><span className="red">*</span> Token Name (Max 30)*</label>
                            <input className="form-control" id="sol_upmd_name" name="name" placeholder="Ex. Solana" type="text" />
                            
                            <div className="mt-1">
                                <span className="text-danger validation_text" id="valid_error_name"></span>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label"><span className="red">*</span> Token Symbol (Max 10)*</label>
                            <input className="form-control" id="sol_upmd_symbol" name="symbol" placeholder="Ex. SOL" type="text" />
                            
                            <div className="mt-1">
                                <span className="text-danger validation_text" id="valid_error_symbol"></span>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Description</label>
                            <textarea className="form-control" id="sol_upmd_description" name="description" placeholder="Ex: First community token on Solana.." rows={8}></textarea>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label"><span className="red">*</span> Icon</label>
                            <IconUpload/>

                            <div className="mt-1">
                                <span className="text-danger validation_text" id="valid_error_icon_upload"></span>
                            </div>
                        </div>
                    </div>
                    

                    <UpdateMetadata/>
                </form>

                <h2>How to use Solana Token Creator</h2>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <b>1.</b> Connect your Solana wallet 
                    </li>
                    <li className="list-group-item">
                        <b>2.</b> Enter the token addrress
                    </li>
                    <li className="list-group-item">
                        <b>3.</b> Write the name you want for your Token
                    </li>
                    <li className="list-group-item">
                        <b>4.</b> Indicate the symbol (max 10 characters)
                    </li>
                    <li className="list-group-item">
                        <b>5.</b> Write the description you want for your SPL Token 
                    </li>
                    <li className="list-group-item">
                        <b>6.</b> Upload the image for your token (PNG, JPG, JPEG, max 2 MB)
                    </li>
                    <li className="list-group-item">
                        <b>7.</b> Click on create, accept the transaction and wait until your token is ready
                    </li>
                </ul>
            </div>

        </main>
    );
}
