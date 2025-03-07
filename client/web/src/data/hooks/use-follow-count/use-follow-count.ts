import { useQuery } from "@tanstack/react-query";

import { QueryKey } from "@/constants/query-key";
import { FollowCountQueryVariables } from "@/data/generated/get-sdk";
import { useDataSdk } from "@/providers/data-sdk";

export type UseFollowCountArgs = FollowCountQueryVariables;

const useFollowCount = ({ walletAddress }: UseFollowCountArgs) => {
  const { sdk } = useDataSdk();
  return useQuery({
    queryKey: [QueryKey.FollowCount],
    queryFn: () => sdk.FollowCount({ walletAddress }),
    enabled: !!walletAddress,
  });
};

export default useFollowCount;
