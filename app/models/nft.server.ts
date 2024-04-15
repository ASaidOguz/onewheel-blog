// This script demonstrates access to the NFT API via the Alchemy SDK.
import { Network, Alchemy } from "alchemy-sdk";




export async function getAllNft(){
// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
    apiKey: process.env.POLYGON_API_KEY, // Replace with your Alchemy API Key.
    network: Network.MATIC_MAINNET, // Replace with your network.
  };
  const ownerAddr="0x02D3E8d859cd80A64957Da87d0Ac7332D4Fae581"

  const alchemy = new Alchemy(settings);

// Print owner's wallet address:


// Print total NFT count returned in the response:
const nftsForOwner = await alchemy.nft.getNftsForOwner(ownerAddr);

return nftsForOwner
}