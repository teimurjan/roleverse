import React from "react";

import FollowersList from "@/components/widgets/followers-list";

const Followers =  async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <div className="h-full w-full flex flex-col gap-4">
      <h3 className="text-xl font-semibold">Followers</h3>

      <FollowersList userId={id} />
    </div>
  );
};

export default Followers;
