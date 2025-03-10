"use client";

import { Globe, Heart, LogOut, Newspaper } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAccount } from "wagmi";

import CopyAddress from "@/components/dumb/copy-address";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import useIsClient from "@/hooks/use-is-client";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/providers/auth";

import AppRightSidebar from "../app-right-sidebar";
import FollowCount from "../follow-count";

const AppSidebar = () => {
  const { address } = useAccount();
  const { user, logOut } = useAuth();
  const pathname = usePathname();
  const isMobile = useIsMobile();

  const isClient = useIsClient();

  return (
    <Sidebar variant="floating">
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

          {user && (
            <Link href={`/profile/${user.me.id}`} className="font-bold">
              @{user.me.username}
            </Link>
          )}

          {address && <CopyAddress address={address} />}
        </div>

        <FollowCount className="px-3" userId={user?.me.id} />

        <Separator className="mt-2" />

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isClient && pathname === "/"}
                  size="lg"
                >
                  <Link href="/">
                    <Newspaper />
                    <span>Feed</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isClient && pathname === "/explore"}
                  size="lg"
                >
                  <Link href="/explore">
                    <Globe />
                    <span>Explore</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isClient && pathname === "/liked"}
                  size="lg"
                >
                  <Link href="/liked">
                    <Heart />
                    <span>Liked</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {isMobile && <AppRightSidebar />}
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
