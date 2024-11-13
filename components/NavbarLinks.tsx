"use client";

import { navbarLinks } from "@/app/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavbarLinks = () => {
  // - show the current active link based on the path name
  const pathname = usePathname();

  return (
    <div className="col-span-6 hidden items-center justify-center gap-2 md:flex">
      {navbarLinks.map((link) => (
        <Link
          className={cn(
            pathname === link.href
              ? "bg-muted"
              : "hover:bg-muted hover:bg-opacity-75",
            "group flex items-center rounded-md p-2 font-semibold",
          )}
          href={link.href}
          key={link.id}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
};
export default NavbarLinks;
