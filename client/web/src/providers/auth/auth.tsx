"use client";

import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { isAddress, isAddressEqual, zeroAddress } from "viem";
import { useAccount, useSignMessage } from "wagmi";

import { QueryKey } from "@/constants/query-key";
import {
  MeQuery,
  RegisterMutationVariables,
  SignInMutationVariables,
} from "@/data/generated/get-sdk";
import { toast } from "@/hooks/use-toast";

import { useDataSdk } from "../data-sdk";

type SignInArgs = Omit<SignInMutationVariables, "signature">;
type RegisterArgs = Omit<RegisterMutationVariables, "signature">;

interface AuthContextProps {
  signIn: UseMutationResult<void, Error, SignInArgs, unknown>["mutateAsync"];
  register: UseMutationResult<
    void,
    Error,
    RegisterArgs,
    unknown
  >["mutateAsync"];
  isLoading: boolean;
  user?: MeQuery;
  logOut: () => Promise<void>;
}

export class SignInUnsuccessfulError extends Error {
  constructor() {
    const prototype = new.target.prototype;
    super("Sign in failed: check your signature");
    Object.setPrototypeOf(this, prototype);
  }
}

export class RegisterUnsuccessfulError extends Error {
  constructor() {
    const prototype = new.target.prototype;
    super("Sign in failed: check your signature");
    Object.setPrototypeOf(this, prototype);
  }
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { address, isConnected } = useAccount();
  const { sdk } = useDataSdk();
  const { signMessageAsync } = useSignMessage();
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const router = useRouter();

  const {
    data: me,
    isPending: isLoadingMe,
    refetch,
  } = useQuery({
    queryKey: [QueryKey.Me],
    queryFn: async () => {
      try {
        return await sdk.Me();
      } catch (_e) {
        return null;
      }
    },
    retry: false,
  });

  const logOut = useCallback(async () => {
    await sdk.LogOut();
    await queryClient.invalidateQueries();
    router.replace("/auth");
  }, [queryClient, router, sdk]);

  const loggedInUserAddress = me?.me.walletAddress;
  const isLoggedInWithAnotherWallet =
    loggedInUserAddress &&
    isAddress(loggedInUserAddress) &&
    isConnected &&
    !isAddressEqual(loggedInUserAddress, address ?? zeroAddress);
  const isLoggedInOnAuthPage =
    loggedInUserAddress &&
    isAddress(loggedInUserAddress) &&
    isConnected &&
    isAddressEqual(loggedInUserAddress, address ?? zeroAddress) &&
    pathname === "/auth";
  useEffect(() => {
    if (isLoggedInWithAnotherWallet) {
      logOut();
      return;
    }

    if (isLoggedInOnAuthPage) {
      router.replace("/");
    }
  }, [isLoggedInWithAnotherWallet, isLoggedInOnAuthPage, logOut, router]);

  const { mutateAsync: signIn, isPending: isSigningIn } = useMutation({
    mutationFn: async ({ walletAddress }: { walletAddress: string }) => {
      try {
        const generateChallengeResult = await sdk.GenerateChallenge({
          walletAddress,
        });

        const signature = await signMessageAsync({
          message: generateChallengeResult.generateChallenge,
        });
        const signInResult = await sdk.SignIn({
          walletAddress,
          signature,
        });
        if (!signInResult.signIn) {
          throw new SignInUnsuccessfulError();
        }

        refetch();
      } catch (e) {
        console.error(e);
        throw new SignInUnsuccessfulError();
      }
    },
    onError: (e) => {
      toast({
        title: "Something went wrong",
        description: e.message,
      });
    },
  });

  const { mutateAsync: register, isPending: isRegistering } = useMutation({
    mutationFn: async ({
      walletAddress,
      username,
    }: {
      walletAddress: string;
      username: string;
    }) => {
      try {
        const generateChallengeResult = await sdk.GenerateChallenge({
          walletAddress,
        });

        const signature = await signMessageAsync({
          message: generateChallengeResult.generateChallenge,
        });
        const signInResult = await sdk.Register({
          walletAddress,
          username,
          signature,
        });
        if (!signInResult.register) {
          throw new RegisterUnsuccessfulError();
        }

        refetch();
      } catch (e) {
        console.error(e);
        throw new RegisterUnsuccessfulError();
      }
    },
    onError: (e) => {
      toast({
        title: "Something went wrong",
        description: e.message,
      });
    },
  });

  return (
    <AuthContext.Provider
      value={{
        signIn,
        register,
        isLoading: isSigningIn || isLoadingMe || isRegistering,
        user: me ?? undefined,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
