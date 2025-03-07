"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useAccount } from "wagmi";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import ConnectWalletButton from "@/components/widgets/connect-wallet-button";
import SignInButton from "@/components/widgets/sign-in-button";
import { useAuth } from "@/providers/auth";

const registerFormSchema = z.object({
  username: z.string().min(2).max(50),
});

const AuthForm = () => {
  const { address, isConnected } = useAccount();
  const { register, isLoading } = useAuth();
  const registerForm = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof registerFormSchema>) => {
    if (address) {
      await register({ walletAddress: address, ...values });
    }
  };

  return (
    <div className="flex flex-col items-center w-1/2 mx-auto">
      {!isConnected && <ConnectWalletButton />}
      {isConnected && (
        <>
          <Form {...registerForm}>
            <form
              onSubmit={registerForm.handleSubmit(onSubmit)}
              className="flex flex-col space-y-8 w-full"
            >
              <FormField
                control={registerForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your username" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" loading={isLoading}>
                Register
              </Button>
            </form>
          </Form>

          <Separator className="w-full mt-5 mb-4" />

          <SignInButton className="w-full" />
        </>
      )}
    </div>
  );
};

export default AuthForm;
