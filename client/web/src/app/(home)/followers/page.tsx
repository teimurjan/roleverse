import React from "react";

import FollowersList from "@/components/widgets/followers-list";

const Followers = () => {
  return (
    <div className="h-full w-full flex flex-col gap-4">
      <h3 className="text-xl font-semibold">Followers</h3>

      <FollowersList />
    </div>
  );
};

export default Followers;
