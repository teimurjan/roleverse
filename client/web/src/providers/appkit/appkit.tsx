"use client";

import { hardhat } from "@reown/appkit/networks";
import { createAppKit } from "@reown/appkit/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { WagmiProvider } from "wagmi";

import config from "@/config";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const projectId = config.appkit_project_id;

const metadata = {
  name: "Roleverse",
  description: "Roleverse is a decentralized social platform.",
  url: "https://example.com", // TODO: update once available
  icons: ["https://avatars.githubusercontent.com/u/179229932"], // TODO: update once available
};

const networks = [hardhat];

const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true,
});

createAppKit({
  adapters: [wagmiAdapter],
  // @ts-expect-error Appkit has an issue with networks type
  networks,
  projectId,
  metadata,
});

export const AppKitProvider = ({ children }: PropsWithChildren) => {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
};
