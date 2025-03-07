import React from "react";

import AuthForm from "@/components/widgets/auth-form";

import ChevronBackground from "@/assets/svg/chevron-background.svg";

const Auth = () => {
  return (
    <div className="h-screen bg-background flex flex-row items-center">
      <div className="flex-1 h-full">
        <ChevronBackground className="w-full h-full" />
      </div>
      <div className="flex-1">
        <AuthForm />
      </div>
    </div>
  );
};

export default Auth;
  