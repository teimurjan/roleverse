import { GraphQLClient } from "graphql-request";

import config from "@/config";

import { getSdk } from "../generated/get-sdk";

const buildSdk = () => {
  const client = new GraphQLClient(config.graphql_url, {
    credentials: "include",
    mode: "cors",
  });
  return getSdk(client);
};

export default buildSdk;
