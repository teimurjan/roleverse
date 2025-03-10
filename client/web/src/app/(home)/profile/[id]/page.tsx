import UserProfileHeader from "@/components/widgets/user-profile-header";
import UserProfilePostList from "@/components/widgets/user-profile-post-list";

const Profile = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <div className="h-full w-full flex flex-col gap-8 overflow-hidden">
      <UserProfileHeader userId={id} />
      <div className="flex-1 overflow-y-auto pb-4">
        <UserProfilePostList userId={id} />
      </div>
    </div>
  );
};

export default Profile;
