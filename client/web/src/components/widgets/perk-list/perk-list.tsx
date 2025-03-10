"use client";

import { Skeleton } from "@/components/ui/skeleton";
import usePerks from "@/onchain/hooks/use-perks";

import PerkWithAction from "../perk-with-action";

interface PerkListProps {
  className?: string;
}

const PerkList = ({ className }: PerkListProps) => {
  const { data: perks, isPending } = usePerks();
  return (
    <div className={className}>
      {isPending ? (
        <>
          <Skeleton className="mb-1 h-5 w-full" />
          <Skeleton className="mb-1 h-5 w-full" />
          <Skeleton className="mb-1 h-5 w-full" />
        </>
      ) : (
        perks?.map((perk) =>
          perk.name && perk.key ? (
            <PerkWithAction
              key={perk.key}
              className="mb-1"
              name={perk.name}
              perkKey={perk.key}
              price={perk.price ?? BigInt(0)}
            />
          ) : null
        )
      )}
    </div>
  );
};

export default PerkList;
