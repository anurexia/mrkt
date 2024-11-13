import Link from "next/link";
import NavbarLinks from "./NavbarLinks";
import { Button } from "./ui/button";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
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
        <Button size="sm">Login</Button>
        <Button variant="secondary" size="sm">
          Register
        </Button>

        <div className="ml-4 md:hidden">
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
