import prisma from "@/app/lib/db";
import ProductDescription from "@/components/ProductDescription";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

import { JSONContent } from "@tiptap/react";
import { BuyProduct } from "@/app/actions";
import { BuyButton } from "@/components/SubmitButton";

const getData = async (productId: string) => {
  const data = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      id: true,
      category: true,
      description: true,
      short_description: true,
      name: true,
      images: true,
      price: true,
      created_at: true,
      User: {
        select: {
          profile_image: true,
          first_name: true,
        },
      },
    },
  });

  return data;
};

const ProductPage = async ({ params }: { params: { productId: string } }) => {
  const product = await getData(params.productId);

  return (
    <section className="mx-auto max-w-7xl px-4 lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 lg:px-8 xl:gap-x-16">
      <Carousel className="lg:col-span-4 lg:row-end-1">
        <CarouselContent>
          {product?.images.map((image) => (
            <CarouselItem key={image}>
              {/* this aspect is a tailwind plugin, so you need to  install it */}
              <div className="aspect-h-3 aspect-w-3 overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={image}
                  fill
                  alt="product image"
                  className="h-full w-full rounded-lg object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext className="z-50 mr-16" />
        <CarouselPrevious className="ml-16" />
      </Carousel>

      {/* for the information of the product */}
      <div className="lg:w-max-none mx-auto mt-5 max-w-2xl lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0">
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-700">
          {product?.name}
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {product?.short_description}
        </p>

        <form action={BuyProduct}>
          <input type="hidden" name="id" value={product?.id} />
          <BuyButton price={product?.price as number} />
        </form>

        {/* Product details  */}
        <div className="mt-6 pt-6">
          <div className="flex flex-col gap-y-3 border-y border-y-neutral-200 py-10">
            <div className="flex items-center justify-between">
              <h3 className="text-md mb-2 font-semibold text-muted-foreground">
                Released:
              </h3>

              <h3 className="text-sm font-medium">
                {new Intl.DateTimeFormat("PH", {
                  dateStyle: "long",
                }).format(product?.created_at)}
              </h3>
            </div>

            <div className="flex items-center justify-between">
              <h3 className="text-md mb-2 font-semibold text-muted-foreground">
                Category
              </h3>
              <h3 className="text-sm font-medium capitalize">
                {product?.category}
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 w-full max-w-2xl lg:col-span-4 lg:mt-0 lg:max-w-none">
        <ProductDescription content={product?.description as JSONContent} />
      </div>
    </section>
  );
};
export default ProductPage;
