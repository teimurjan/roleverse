"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Address, formatEther, TransactionReceipt, zeroAddress } from "viem";
import { useAccount } from "wagmi";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";
import useAvailableRoles from "@/onchain/hooks/use-available-roles";
import useRole from "@/onchain/hooks/use-role";
import useSetRole from "@/onchain/hooks/use-set-role";

const formSchema = z.object({
  roleAddress: z.string({
    required_error: "You need to select a role address.",
  }),
});

interface ChangeRoleFormProps {
  onSuccessfulSubmit?: (receipt: TransactionReceipt) => void;
  onCancel?: () => void;
}

const ChangeRoleForm = ({
  onSuccessfulSubmit,
  onCancel,
}: ChangeRoleFormProps) => {
  const setRole = useSetRole();
  const { address } = useAccount();
  const { data: availableRoles, isLoading: areAvailableRolesLoading } =
    useAvailableRoles();
  const {
    data: role,
    isLoading: isRoleLoading,
  } = useRole({ address });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      if (data.roleAddress === role?.address) {
        onCancel?.();
        return;
      }

      const value = availableRoles?.find(
        (role) => role.address === data.roleAddress
      )?.price;
      if (!value) {
        throw new Error("Role price not found");
      }

      const receipt = await setRole({
        roleAddress: data.roleAddress as Address,
        value,
      });
      if (receipt) {
        onSuccessfulSubmit?.(receipt);
      }
    } catch (_e) {
      toast({
        title: "Something went wrong",
        description: "Try again later, please",
      });
    }
  };

  return areAvailableRolesLoading || isRoleLoading ? (
    <Loader2 className="animate-spin" />
  ) : (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          defaultValue={role?.address ?? zeroAddress}
          name="roleAddress"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                <RadioGroup
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={zeroAddress} />
                    </FormControl>
                    <FormLabel className="font-normal">Human</FormLabel>
                  </FormItem>

                  {availableRoles?.map((role) =>
                    role.address ? (
                      <FormItem
                        key={role.address}
                        className="flex items-center space-x-3 space-y-0"
                      >
                        <FormControl>
                          <RadioGroupItem value={role.address} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {role.name} - {formatEther(role.price ?? BigInt(0))}{" "}
                          ETH
                        </FormLabel>
                      </FormItem>
                    ) : null
                  )}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" loading={form.formState.isSubmitting}>
          Change
        </Button>
      </form>
    </Form>
  );
};

export default ChangeRoleForm;
