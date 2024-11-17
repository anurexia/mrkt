"use client";

import { categories } from "@/app/lib/constants";
import { Card, CardHeader } from "./ui/card";
import { useState } from "react";
import { cn } from "@/lib/utils";

const SelectCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {categories.map((category) => (
        <div
          key={category.id}
          className="cursor-pointer"
          onClick={() => setSelectedCategory(category.title)}
        >
          <Card
            className={cn(
              selectedCategory === category.title &&
                "border-primary transition-all duration-300",
              "border-2",
            )}
          >
            <CardHeader>
              {category.image} <h3 className="font-medium">{category.name}</h3>
            </CardHeader>
          </Card>
        </div>
      ))}
    </div>
  );
};
export default SelectCategory;
