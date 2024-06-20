import { SignInButton } from "./components/SignInOut/SignInButton";
import { SignOutButton } from "./components/SignInOut/SignOutButton";

export default function Home() {
  return (
    <main className="flex gap-4">
      Hello
      <SignInButton />
      <SignOutButton />
    </main>
  );
}
