import { json } from "@remix-run/node"

import NFTCard from "~/components/NftCard"
import { getAllNft } from "~/models/nft.server"




export const loader= async()=>{             
    const nfts= await getAllNft()    
    return json({nfts})
   }

export default function NftRoute(){

    
    
    
return(
    <div>
       <NFTCard />
    </div>
)
}