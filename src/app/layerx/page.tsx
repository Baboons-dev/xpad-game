"use client";

import { Heart, Share2 } from "lucide-react";

import {Avatar, Badge} from "antd";

const nfts = [
  {
    id: 1,
    title: "Cosmic Dreamscape #137",
    image: "https://images.unsplash.com/photo-1634973357973-f2ed2657db3c?w=800&auto=format&fit=crop&q=60",
    price: "2.5 ETH",
    creator: {
      name: "Elena Stars",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&auto=format&fit=crop",
    },
    network: "Ethereum",
    likes: 234,
  },
  {
    id: 2,
    title: "Digital Genesis #089",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60",
    price: "1.8 ETH",
    creator: {
      name: "Alex Quantum",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&auto=format&fit=crop",
    },
    network: "Polygon",
    likes: 189,
  },
  {
    id: 3,
    title: "Neon Horizons #442",
    image: "https://images.unsplash.com/photo-1633101585272-9511da5fd523?w=800&auto=format&fit=crop&q=60",
    price: "3.2 ETH",
    creator: {
      name: "Maya Digital",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&auto=format&fit=crop",
    },
    network: "Ethereum",
    likes: 567,
  },
  {
    id: 4,
    title: "Cyber Punk City #221",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&auto=format&fit=crop&q=60",
    price: "1.5 ETH",
    creator: {
      name: "Chris Matrix",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&auto=format&fit=crop",
    },
    network: "Polygon",
    likes: 321,
  },
];

function NFTCard({ nft }: { nft: typeof nfts[0] }) {
  return (
    <div className="overflow-hidden bg-card border-border hover:border-brand-lime/50 transition-colors">
      <div className="aspect-square relative overflow-hidden">
        <img
          src={nft.image}
          alt={nft.title}
          className="object-cover w-full h-full hover:scale-110 transition-transform duration-300"
        />
        <Badge 
          className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm text-brand-lime border-brand-lime"
        >
          {nft.network}
        </Badge>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-lg text-brand-white truncate">{nft.title}</h3>
          <span className="text-brand-lime font-medium shrink-0 ml-2">{nft.price}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 min-w-0">
            <Avatar className="h-8 w-8 shrink-0" src={nft.creator.avatar}>
            </Avatar>
            <span className="text-sm text-muted truncate">{nft.creator.name}</span>
          </div>
          <div className="flex items-center space-x-3 shrink-0 ml-2">
            <button className="text-muted hover:text-brand-lime transition-colors">
              <Heart className="h-5 w-5" />
            </button>
            <button className="text-muted hover:text-brand-lime transition-colors">
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LayerXPage() {
  return (
    <main className="min-h-screen bg-background p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-brand-lime">Featured NFTs</h1>
          <p className="text-muted max-w-2xl mx-auto text-sm sm:text-base">
            Discover unique digital assets created by talented artists across multiple networks
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-6">
          {nfts.map((nft) => (
            <NFTCard key={nft.id} nft={nft} />
          ))}
        </div>
      </div>
    </main>
  );
}