import { Query } from "@tanstack/react-query";

const isReadContractsQuery = (query: Query, functionNames: string[]) => {
  if (query.queryKey[0] !== "readContracts") {
    return false;
  }

  const config = query.queryKey[1];

  return (
    typeof config === "object" &&
    !!config &&
    "contracts" in config &&
    Array.isArray(config.contracts) &&
    config.contracts.some(
      (item) =>
        typeof item === "object" &&
        item &&
        "functionName" in item &&
        functionNames.some((functionName) => item.functionName === functionName)
    )
  );
};

export default isReadContractsQuery;
