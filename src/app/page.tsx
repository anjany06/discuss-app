import { Button } from "@/components/ui/button";
import { signIn } from "./actions/sign-in";
import { signOut } from "./actions/sign-out";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <form action={signIn}>
        <Button type="submit">Sign In</Button>
      </form>
      <form action={signOut}>
        <Button type="submit">Sign Out</Button>
      </form>
    </div>
  );
}
