import React from "react";

import FollowingList from "@/components/widgets/following-list";

const Following = () => {
  return (
    <div className="h-full w-full flex flex-col gap-4">
      <h3 className="text-xl font-semibold">Following</h3>

      <FollowingList />
    </div>
  );
};

export default Following;
