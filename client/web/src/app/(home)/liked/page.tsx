import React from "react";

import LikedList from "@/components/widgets/liked-list";

const Liked = () => {
  return (
    <div className="h-full w-full flex flex-col gap-4">
      <h3 className="text-xl font-semibold mb-4">Liked</h3>

      <LikedList />
    </div>
  );
};

export default Liked;
