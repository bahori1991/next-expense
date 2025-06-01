import ActiveLink from "@/components/active-link";
import { SignInButton } from "@/components/sign-in";
import { SignOut } from "@/components/sign-out";
import { auth } from "@/lib/auth/auth";

async function NavBar() {
  const session = await auth();

  return (
    <nav className="flex p-2 justify-between">
      <div className="flex gap-2">
        <ActiveLink href="/">Home</ActiveLink>
        <ActiveLink href="/about">About</ActiveLink>
        <ActiveLink href="/expenses">Expenses</ActiveLink>
        <ActiveLink href="/create-expense">Create</ActiveLink>
        <ActiveLink href="/profile">Profile</ActiveLink>
      </div>
      {session?.user ? <SignOut /> : <SignInButton />}
    </nav>
  );
}

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBar />
      <hr />
      {children}
    </>
  );
}
