"use client";

import { DialogProps } from "@radix-ui/react-dialog";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

import ChangeRoleForm from "../change-role-form";

type ChangeDialogProps = Pick<DialogProps, "open" | "onOpenChange">;

const ChangeRoleDialog = ({ open, onOpenChange }: ChangeDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change your role</DialogTitle>
          <DialogDescription>
            You can purchase a new role to get access to more features.
          </DialogDescription>
        </DialogHeader>

        <ChangeRoleForm
          onSuccessfulSubmit={(receipt) => {
            toast({
              title: "Role has been successfully changed",
              description: `Transaction hash: ${receipt.transactionHash}`,
            });
            onOpenChange?.(false);
          }}
          onCancel={() => onOpenChange?.(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ChangeRoleDialog;
