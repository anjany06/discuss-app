import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { signIn } from "@/app/actions/sign-in";

const HeaderPage = () => {
  return (
    <div className="grid grid-cols-3 h-14 items-center mt-6">
      <div className="flex justify-start">
        <h1 className="font-bold text-xl">Discuss</h1>
      </div>
      <div className="flex justify-center">
        <Input type="text" placeholder="Search Post..." />
      </div>
      <div className="flex justify-end gap-2">
        <form action={signIn}>
          <Button type="submit" variant={"outline"}>
            Sign In
          </Button>
        </form>
        <form action={signIn}>
          <Button type="submit" >Sign Up</Button>
        </form>
      </div>
    </div>
  );
};

export default HeaderPage;
