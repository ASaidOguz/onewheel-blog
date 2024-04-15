/* eslint-disable jsx-a11y/media-has-caption */
import { useMatches } from "@remix-run/react";
import { OwnedNft, OwnedNftsResponse } from "alchemy-sdk";
import { useState } from "react";

interface NftType {
    nfts: OwnedNftsResponse;
}

const NFTCard = () => {
    const matches = useMatches();
    const { nfts } = matches[1].data as NftType;

    // Filter out NFTs with image URLs ending in ".mp4"
    const mp4Nfts = nfts.ownedNfts.filter(nft => nft.image && nft.image.originalUrl && nft.image.originalUrl.endsWith('.mp4'));
    const [copiedNft, setCopiedNft] = useState<OwnedNft | null>(null);

    const copyonClickboard = (nft: OwnedNft) => {
        if (typeof window !== 'undefined') {
            navigator.clipboard.writeText(nft.contract.address)
                .then(() => {
                    setCopiedNft(nft);
                    setTimeout(() => setCopiedNft(null), 1000);
                })
                .catch((error) => {
                    console.error('Failed to copy: ', error);
                });
        }
    }

    return (
        <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
            <div className="mt-6 flex flex-wrap justify-center gap-8">
                {mp4Nfts.map((nft) => (
                    <div key={nft.tokenId} className="w-1/4">
                        <div className="flex flex-col gap-y-12 mt-4 rounded-lg bg-gray-100 shadow-lg">
                            <div className="rounded-t-lg overflow-hidden">
                                <video controls width="600" height="400" autoPlay loop style={{ borderRadius: "10px" }}>
                                    <source src={nft.image.originalUrl} type="video/mp4" />
                                    <track src="captions.vtt" kind="subtitles" srcLang="en" label="English" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                            <div className="flex flex-col y-gap-2 px-2 py-3 bg-blue-200 rounded-b-lg">
                                <div className="">
                                    <h2 className="text-xl text-gray-800">{nft.name}</h2>
                                    <p className="text-gray-600">Id: {nft.tokenId.substr(nft.tokenId.length - 4)}</p>

                                    <button
                                        className={"disabled:bg-slate-500 text-white bg-purple-400 px-4 py-2 mt-3 rounded-sm "}
                                        onClick={() => copyonClickboard(nft)}>Copy</button>
                                    {copiedNft && copiedNft.tokenId === nft.tokenId ? <p>Copied</p> : null}

                                    <p className="text-gray-600">{`${nft.contract.address.substr(0, 4)}...${nft.contract.address.substr(nft.contract.address.length - 4)}`}</p>
                                </div>
                            </div>
                            <div className="flex-grow mt-2 bg-green-200 rounded-b-lg">
                                <div>{nft.description?.substr(0, 150)}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NFTCard;
