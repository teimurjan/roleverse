import React from "react";

import ExploreList from "@/components/widgets/explore-list";

const Explore = () => {
  return (
    <div className="h-full w-full flex flex-col gap-4">
      <h3 className="text-xl font-semibold mb-4">Explore</h3>

      <ExploreList />
    </div>
  );
};

export default Explore;
