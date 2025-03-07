import React from "react";

import CreatePostForm from "@/components/widgets/create-post-form";
import Feed from "@/components/widgets/feed";
import MintDialog from "@/components/widgets/mint-dialog";

const Home = () => {
  return (
    <div className="h-full w-full flex flex-col gap-4 overflow-hidden">
      <h3 className="text-xl font-semibold">Feed</h3>

      <CreatePostForm />

      <div className="flex-1 overflow-y-auto pb-4">
        <Feed />
      </div>

      <MintDialog />
    </div>
  );
};

export default Home;
