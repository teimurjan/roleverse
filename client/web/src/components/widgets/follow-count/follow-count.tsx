import Link from "next/link";

import { Button } from "@/components/ui/button";
import useFollowCount from "@/data/hooks/use-follow-count";
import { cn } from "@/lib/utils";

interface FollowCountProps {
  userId?: string;
  className?: string;
}

const FollowCount = ({ userId, className }: FollowCountProps) => {
  const { data: followCount } = useFollowCount({ userId });

  return (
    <div className={cn("flex items-center gap-4", className)}>
      <Link href={`/following/${userId}`}>
        <Button className="px-0" variant="link">
          {followCount?.followCount.following} Following
        </Button>
      </Link>
      <Link href={`/followers/${userId}`}>
        <Button className="px-0" variant="link">
          {followCount?.followCount.followers} Follower
          {followCount?.followCount.followers !== 1 && "s"}
        </Button>
      </Link>
    </div>
  );
};

export default FollowCount;
