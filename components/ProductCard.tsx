import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";

import { JSONContent } from "@tiptap/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Link from "next/link";

interface ProductCardProps {
  id: string;
  name: string;
  short_description: string;
  images: string[];
  price: number;
  category: JSONContent;
}

const ProductCard = ({
  id,
  images,
  //   category,
  name,
  price,
  short_description,
}: ProductCardProps) => {
  return (
    <Card className="border-none">
      <CardHeader>
        <Carousel
          opts={{
            duration: 10,
            loop: true,
          }}
        >
          <CarouselContent>
            {images.map((image) => (
              <CarouselItem key={image}>
                <Image
                  src={image}
                  className="h-60 w-full rounded-lg object-cover"
                  height={1000}
                  width={1000}
                  alt="Product Card"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext className="mr-16" />
          <CarouselPrevious className="ml-16" />
        </Carousel>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="font-semibold">{name}</p>
          <span className="rounded-md bg-primary p-2 text-xs font-medium text-primary-foreground">
            ${price}
          </span>
        </div>

        <div>
          <p className="line-clamp-2 text-muted-foreground">
            {short_description}
          </p>
        </div>
      </CardContent>

      <CardFooter>
        <Button size={"lg"} className="w-full" asChild>
          <Link href={`product/${id}`}>Learn More</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
export default ProductCard;
