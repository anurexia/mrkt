"use client";

import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { navbarLinks } from "@/app/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const MobileMenu = () => {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetHeader className="sr-only">
        <SheetTitle>Menu</SheetTitle>
      </SheetHeader>

      <SheetContent className="w-full">
        <div className="mt-8 flex w-full flex-col gap-4 p-2">
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
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
