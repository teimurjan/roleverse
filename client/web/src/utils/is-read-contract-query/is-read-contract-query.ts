import { Query } from "@tanstack/react-query";

const isReadContractQuery = (query: Query, functionName: string) => {
  if (query.queryKey[0] !== "readContract") {
    return false;
  }

  const config = query.queryKey[1];
  if (typeof config !== "object" || !config) {
    return false;
  }

  if ("functionName" in config && config.functionName === functionName) {
    return true;
  }

  return false;
};

export default isReadContractQuery;
