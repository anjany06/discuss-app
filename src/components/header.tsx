import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { signIn } from "@/app/actions/sign-in";
import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Popover, PopoverContent } from "./ui/popover";
import { LogOut } from "lucide-react";
import { Separator } from "./ui/separator";
import { signOut } from "@/app/actions/sign-out";

const HeaderPage = async () => {
  const session = await auth(); // yeh user info niklne ka tareeka sirf server comp me hi kaam krega
  // client comp me tareeka thoda alg hai
  return (
    <div className="grid grid-cols-3 h-14 items-center mt-6">
      <div className="flex justify-start">
        <h1 className="font-bold text-xl">Discuss</h1>
      </div>
      <div className="flex justify-center">
        <Input type="text" placeholder="Search Post..." />
      </div>
      <div className="flex justify-end gap-2">
        {session?.user ? (
          <Popover>
            <PopoverTrigger asChild>
              <Avatar>
                <AvatarImage src={session.user.image || ""} alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent>
              <h1>{session.user.name}</h1>
              <Separator className="my-3" />
              <form action={signOut}>
                <Button>
                  <LogOut />
                  Sign Out
                </Button>
              </form>
            </PopoverContent>
          </Popover>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default HeaderPage;
