"use client";

import { createContext, PropsWithChildren, useContext } from "react";

import { Sdk } from "@/data/generated/get-sdk";
import { buildSdk } from "@/data/sdk";

const sdk = buildSdk();
const DataSdkContext = createContext<{ sdk: Sdk }>({ sdk });

export const DataSdkProvider = ({ children }: PropsWithChildren) => (
  <DataSdkContext.Provider value={{ sdk }}>{children}</DataSdkContext.Provider>
);

export const useDataSdk = () => useContext(DataSdkContext);
