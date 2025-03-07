"use client";

import { Copy, Globe, Heart, LogOut, Newspaper } from "lucide-react";
import Link from "next/link";
import { useAccount } from "wagmi";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import useFollowCount from "@/data/hooks/use-follow-count";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/providers/auth";
import shortenAddress from "@/utils/shorten-address";

const AppSidebar = () => {
  const { address } = useAccount();
  const { user, logOut } = useAuth();
  const { data: followCount } = useFollowCount({ walletAddress: address });

  const handleCopy = async () => {
    if (!address) {
      return;
    }

    await navigator.clipboard.writeText(address);
    toast({
      title: "Copied address to clipboard",
      description: shortenAddress(address),
    });
  };

  return (
    <Sidebar>
      <SidebarContent>
        <div className="pt-4 px-3">
          {address && (
            <Avatar className="mb-2 w-16 h-16">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback className="text-2xl">
                @{user?.me.username.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
          )}

          {address && (
            <div className="flex items-center gap-2">
              <span className="text-small font-bold">
                {shortenAddress(address)}
              </span>
              <Button variant="ghost" size="icon-sm" onClick={handleCopy}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          )}

          {user && (
            <p className="text-slate-500 text-xs">@{user.me.username}</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Link href="/following">
            <Button variant="link">
              {followCount?.followCount.following} Following
            </Button>
          </Link>
          <Link href="/followers">
            <Button variant="link">
              {followCount?.followCount.followers} Follower
              {followCount?.followCount.followers !== 1 && "s"}
            </Button>
          </Link>
        </div>

        <Separator className="mt-2" />

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild size="lg">
                  <Link href="/">
                    <Newspaper />
                    <span>Feed</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild size="lg">
                  <a href="/explore">
                    <Globe />
                    <span>Explore</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild size="lg">
                  <a href="/liked">
                    <Heart />
                    <span>Liked</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={logOut} size="lg">
              <LogOut />
              <span>Log out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
