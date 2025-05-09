import { PinataSDK } from "pinata-web3";
import { PINATA_JWT } from "../config";

export const UploadMetadata = async (tokenData: any) => {
    const pinata = new PinataSDK({
        pinataJwt: PINATA_JWT,
    });
    
    try {
        const imageUploadResponse = await pinata.upload.file(tokenData.icon_upload);
        
        const ipfsImageUri = `https://ipfs.io/ipfs/${imageUploadResponse.IpfsHash}`;

        const json = {
            name: tokenData.name,
            symbol: tokenData.symbol,
            description: tokenData.description,
            image: ipfsImageUri,
        };
        const jsonBlob = new Blob([JSON.stringify(json)], {
            type: "application/json",
        });

        const jsonFileName = "uri.json";
        const jsonFile = new File([jsonBlob], jsonFileName);
        const jsonUploadResponse = await pinata.upload.file(jsonFile);
        const ipfsJsonUri = `https://ipfs.io/ipfs/${jsonUploadResponse.IpfsHash}`;

        return ipfsJsonUri;

    } catch (error) {
        console.log("Error uploading to Pinata:", error);
        
        return null;
    }

}