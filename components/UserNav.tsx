import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import { HandCoins, Package, Settings } from "lucide-react";

interface UserNavProps {
  name: string;
  email: string;
  image: string | undefined;
}

const UserNav = ({ email, image, name }: UserNavProps) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10">
              <AvatarImage src={image} />

              <AvatarFallback className="text-xs uppercase">
                {name.slice(0, 3)}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="mt-2 w-56 p-4" align="end" forceMount>
          <DropdownMenuLabel>
            <div className="flex flex-col gap-y-2">
              <p className="text-sm font-semibold capitalize leading-none">
                {name}
              </p>
              <p className="text-sm leading-none text-muted-foreground">
                {email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="my-2" />

          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href="/sell">Sell a Product</Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link href="/settings">
                Settings{" "}
                <DropdownMenuShortcut>
                  <Settings />
                </DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link href="/my-products">
                Browse your Products{" "}
                <DropdownMenuShortcut>
                  <Package />
                </DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link href="/billing">
                Billing
                <DropdownMenuShortcut>
                  <HandCoins />
                </DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <LogoutLink>Log out</LogoutLink>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
export default UserNav;
