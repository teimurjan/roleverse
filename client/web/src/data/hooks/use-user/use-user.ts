import { useQuery } from "@tanstack/react-query";

import { QueryKey } from "@/constants/query-key";
import { UserQueryVariables } from "@/data/generated/get-sdk";
import { useDataSdk } from "@/providers/data-sdk";

type UseUserParams = UserQueryVariables;

const useUser = ({ id }: UseUserParams) => {
  const { sdk } = useDataSdk();
  return useQuery({
    queryKey: [QueryKey.User, id],
    queryFn: () => sdk.User({ id }),
  });
};

export default useUser