import React from "react";

import ExplorePostList from "@/components/widgets/explore-post-list";

const Explore = () => {
  return (
    <div className="h-full w-full flex flex-col gap-4">
      <h3 className="text-xl font-semibold mb-4">Explore</h3>

      <ExplorePostList />
    </div>
  );
};

export default Explore;
