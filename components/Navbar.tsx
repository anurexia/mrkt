import Link from "next/link";
import NavbarLinks from "./NavbarLinks";
import { Button } from "./ui/button";
import MobileMenu from "./MobileMenu";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import UserNav from "./UserNav";

const Navbar = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <nav className="relative mx-auto flex w-full max-w-7xl items-center px-4 py-7 md:grid md:grid-cols-12">
      <div className="md:col-span-3">
        <Link
          href="/"
          className="text-3xl font-bold uppercase tracking-wide text-neutral-900"
        >
          mr<span className="text-primary">kt</span>
        </Link>
      </div>

      <NavbarLinks />

      <div className="ms-auto flex items-center gap-3 md:col-span-3">
        {user ? (
          // We can assert the value since we know that it will be string
          // for  the image, depending on the registration the image may be null or a string, so we're going to use a fallback
          <UserNav
            email={user.email as string}
            name={user.given_name as string}
            image={
              user.picture ?? `https://avatar.vercel.sh/${user.given_name}`
            }
          />
        ) : (
          <div className="flex items-center gap-2">
            <Button size="sm" asChild>
              <LoginLink>Login</LoginLink>
            </Button>

            <Button variant="secondary" size="sm" asChild>
              <RegisterLink>Register</RegisterLink>
            </Button>
          </div>
        )}

        <div className="ml-4 md:hidden">
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
