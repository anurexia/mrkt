import { Blocks, Hammer, PartyPopper } from "lucide-react";
import { ReactNode } from "react";

export const navbarLinks = [
  {
    id: 0,
    name: "Home",
    href: "/",
  },
  {
    id: 1,
    name: "Templates",
    href: "#",
  },
  {
    id: 2,
    name: "UI Kits",
    href: "#",
  },
  {
    id: 3,
    name: "Icons",
    href: "#",
  },
];

interface categoriesProps {
  id: number;
  name: string;
  title: string;
  image: ReactNode;
  description: string;
}

// - Make sure to make the file .tsx if you're trying to use icons inside
export const categories: categoriesProps[] = [
  {
    id: 0,
    description:
      "A collection of modern, responsive templates for websites and web apps.",
    image: <Blocks />, // Lucide icon for templates
    name: "Templates",
    title: "Website Templates",
  },
  {
    id: 1,
    description:
      "Comprehensive UI kits for building cohesive and visually appealing applications.",
    image: <Hammer />, // Lucide icon for UI kits
    name: "UIKits",
    title: "Design System Kits",
  },
  {
    id: 2,
    description:
      "A rich set of customizable icons for use in various design and development projects.",
    image: <PartyPopper />, // Lucide icon for icons
    name: "Icons",
    title: "Icon Library",
  },
];
