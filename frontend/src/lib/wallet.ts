import { createConfig, http } from "wagmi";
import { injected } from "wagmi/connectors";
import { defineChain } from "viem";

const localChain = defineChain({
  id: Number(process.env.NEXT_PUBLIC_CHAIN_ID ?? 31337),
  name: "Hardhat Local",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["http://127.0.0.1:8545"],
    },
  },
});

export const wagmiConfig = createConfig({
  chains: [localChain],
  connectors: [injected()],
  transports: {
    [localChain.id]: http(),
  },
});

export const marketplaceAddress = process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS as `0x${string}` | undefined;
