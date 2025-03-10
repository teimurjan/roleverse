import { cn } from "@/lib/utils";

import WalletBalance from "../wallet-balance";

interface AppHeaderProps {
  className?: string;
}

const AppHeader = ({ className }: AppHeaderProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-end py-4 bg-primary-background",
        className
      )}
    >
      <WalletBalance />
    </div>
  );
};

export default AppHeader;
