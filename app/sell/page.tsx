"use client";

import SelectCategory from "@/components/SelectCategory";
import MenuBar from "@/components/tiptap/MenuBar";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { UploadDropzone } from "../lib/uploadthing";

const SellRoute = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-8">
      <Card>
        <form>
          <CardHeader>
            <CardTitle>Sell your product with ease</CardTitle>
            <CardDescription>
              Describe your product in detail, so it can be sold
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-y-10">
            <ContentWrapper>
              <Label>Name</Label>
              <Input type="text" placeholder="Enter the name of your product" />
            </ContentWrapper>

            <ContentWrapper>
              <Label>Category</Label>
              <SelectCategory />
            </ContentWrapper>

            <ContentWrapper>
              <Label>Price</Label>
              <Input min={0} type="number" placeholder="Enter your price" />
            </ContentWrapper>

            <ContentWrapper>
              <Label>Description</Label>
              <Textarea placeholder="Describe your product.." />
            </ContentWrapper>

            <MenuBar />

            <ContentWrapper>
              <Label>Product Images</Label>
              <UploadDropzone
                className="ut-button:bg-primary ut-button:text-primary-foreground ut-button:font-semibold ut-button:text-sm"
                // - This endpoints comes from the core.ts, where you can setup multiple routes
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  console.log("Upload completed ", res);
                  alert("Upload completed");
                }}
                onUploadError={() => {
                  alert("There was some problem while uploading the images");
                }}
              />
            </ContentWrapper>

            <ContentWrapper>
              <Label>Product Images</Label>
              <UploadDropzone
                className="ut-button:bg-primary ut-button:text-primary-foreground ut-button:font-semibold ut-button:text-sm"
                // - This endpoints comes from the core.ts, where you can setup multiple routes
                endpoint="productFileUpload"
              />
            </ContentWrapper>
          </CardContent>

          <CardFooter className="mt-5">
            <Button>Submit Form</Button>
          </CardFooter>
        </form>
      </Card>
    </section>
  );
};
export default SellRoute;

const ContentWrapper = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col gap-y-2">{children}</div>;
};
