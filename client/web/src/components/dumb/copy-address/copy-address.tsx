import { Copy } from "lucide-react";
import { Address } from "viem";

import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import shortenAddress from "@/utils/shorten-address";

interface CopyAddressProps {
  className?: string;
  address: Address;
}

const CopyAddress = ({ className, address }: CopyAddressProps) => {
  const handleCopy = async () => {
    if (!address) {
      return;
    }

    await navigator.clipboard.writeText(address);
    toast({
      title: "Copied address to clipboard",
      description: shortenAddress(address),
    });
  };

  return (
    <div
      className={cn(
        "flex items-center gap-2 text-slate-500 text-sm",
        className
      )}
    >
      <span>{shortenAddress(address)}</span>
      <Button variant="ghost" className="h-3 w-3 p-0" onClick={handleCopy}>
        <Copy className="!h-full !w-full" />
      </Button>
    </div>
  );
};

export default CopyAddress;
