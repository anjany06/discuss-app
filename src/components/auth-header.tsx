"use client";
import { useSession } from "next-auth/react";
import React from "react";
import { Button } from "./ui/button";
import { signIn } from "@/actions/sign-in";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Popover, PopoverContent } from "./ui/popover";
import { LogOut } from "lucide-react";
import { Separator } from "./ui/separator";
import { signOut } from "@/actions/sign-out";

const AuthHeader = () => {
  const session = useSession();

  // so jb logged in k refresh krke toh button se photo aane me delay hoga bcoz of useSession
  //delay handling
  if (session.status === "loading") return null;

  let authContent: React.ReactNode;
  if (session.data?.user) {
    authContent = (
      <Popover>
        <PopoverTrigger asChild>
          <Avatar>
            <AvatarImage src={session.data.user.image || ""} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent>
          <h1>{session.data.user.name}</h1>
          <Separator className="my-3" />
          <form action={signOut}>
            <Button>
              <LogOut />
              Sign Out
            </Button>
          </form>
        </PopoverContent>
      </Popover>
    );
  } else {
    authContent = (
      <>
        <form action={signIn}>
          <Button type="submit" variant={"outline"}>
            Sign In
          </Button>
        </form>
        <form action={signIn}>
          <Button type="submit">Sign Up</Button>
        </form>
      </>
    );
  }
  return authContent;
};

export default AuthHeader;
