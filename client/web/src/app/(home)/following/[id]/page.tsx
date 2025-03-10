import React from "react";

import FollowingList from "@/components/widgets/following-list";

const Following = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <div className="h-full w-full flex flex-col gap-4">
      <h3 className="text-xl font-semibold">Following</h3>

      <FollowingList userId={id} />
    </div>
  );
};

export default Following;
