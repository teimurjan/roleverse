import React from "react";

import LikedPostList from "@/components/widgets/liked-post-list";

const Liked = () => {
  return (
    <div className="h-full w-full flex flex-col gap-4">
      <h3 className="text-xl font-semibold mb-4">Liked</h3>

      <LikedPostList />
    </div>
  );
};

export default Liked;
