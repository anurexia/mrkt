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

// - useFormState was renamed to useActionState
import { ReactNode, useActionState, useEffect, useState } from "react";
import { UploadDropzone } from "../lib/uploadthing";
import { JSONContent } from "@tiptap/react";
import { sellProduct, State } from "../actions";
import { toast } from "sonner";
import SubmitButton from "@/components/SubmitButton";
import { redirect } from "next/navigation";

const SellRoute = () => {
  // - using the server action
  const initialState: State = {
    status: undefined,
    message: "",
  };

  // - pass the server action, then the initial state, to remove the error in sell product, add prevState: any
  const [state, formAction] = useActionState(sellProduct, initialState);

  const [json, setJson] = useState<null | JSONContent>(null);
  const [images, setImages] = useState<string[] | null>(null);
  const [productFile, setProductFile] = useState<string | null>(null);

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message);
      // - client side programmatic navigation
      redirect("/");
    } else if (state.status === "error") {
      toast.error(state.message);
    }
  }, [state.status, state.message]);

  return (
    <section className="mx-auto max-w-7xl px-4 md:px-8">
      <Card>
        <form action={formAction}>
          <CardHeader>
            <CardTitle>Sell your product with ease</CardTitle>
            <CardDescription>
              Describe your product in detail, so it can be sold
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-y-10">
            <ContentWrapper>
              <Label>Name</Label>
              <Input
                name="name"
                type="text"
                placeholder="Enter the name of your product"
                required
                min={3}
              />
              {state?.errors?.["name"] && (
                <p className="text-sm font-semibold text-destructive">
                  {state.errors?.["name"]?.[0]}
                </p>
              )}
            </ContentWrapper>

            <ContentWrapper>
              <Label>Category</Label>
              <SelectCategory />
            </ContentWrapper>

            <ContentWrapper>
              <Label>Price</Label>
              <Input
                name="price"
                type="number"
                placeholder="Enter your price"
                min={1}
                required
              />

              {state?.errors?.["price"] && (
                <p className="text-sm font-semibold text-destructive">
                  {state.errors?.["price"]?.[0]}
                </p>
              )}
            </ContentWrapper>

            <ContentWrapper>
              <Label>Description</Label>
              <Textarea
                name="shortDescription"
                placeholder="Describe your product.."
                required
                minLength={10}
              />

              {state?.errors?.["shortDescription"] && (
                <p className="text-sm font-semibold text-destructive">
                  {state.errors?.["shortDescription"]?.[0]}
                </p>
              )}
            </ContentWrapper>

            <ContentWrapper>
              <input
                value={JSON.stringify(json)}
                type="hidden"
                name="description"
              />

              <MenuBar json={json} setJson={setJson} />

              {state?.errors?.["description"] && (
                <p className="text-sm font-semibold text-destructive">
                  {state.errors?.["description"]?.[0]}
                </p>
              )}
            </ContentWrapper>

            <ContentWrapper>
              <input
                type="hidden"
                name="images"
                value={JSON.stringify(images)}
              />
              <Label>Product Images</Label>
              <UploadDropzone
                className="ut-button:bg-primary ut-button:text-sm ut-button:font-semibold ut-button:text-primary-foreground ut-button:ut-uploading:bg-primary"
                // - This endpoints comes from the core.ts, where you can setup multiple routes
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  // - update the images state using the value that comes from the uploaded files, we only need the url, so we're mapping just the url.
                  setImages(res.map((img) => img.url));
                  toast.success("Image has been uploaded successfully!");
                }}
                onUploadError={(error: Error) => {
                  toast.error(`Something went wrong! ${error}`);
                }}
              />

              {state?.errors?.["images"] && (
                <p className="text-sm font-semibold text-destructive">
                  {state.errors?.["images"]?.[0]}
                </p>
              )}
            </ContentWrapper>

            <ContentWrapper>
              <input
                type="hidden"
                name="productFile"
                value={productFile || ""}
              />
              <Label>Product File</Label>
              <UploadDropzone
                onClientUploadComplete={(res) => {
                  setProductFile(res[0]?.url);
                  toast.success(
                    "Compressed Images has been uploaded successfully!",
                  );
                }}
                className="ut-button:bg-primary ut-button:text-sm ut-button:font-semibold ut-button:text-primary-foreground"
                // - This endpoints comes from the core.ts, where you can setup multiple routes
                endpoint="productFileUpload"
                onUploadError={(error: Error) => {
                  toast.error(`Something went wrong! ${error}`);
                }}
              />

              {state?.errors?.["productFile"] && (
                <p className="text-sm font-semibold text-destructive">
                  {state.errors?.["productFile"]?.[0]}
                </p>
              )}
            </ContentWrapper>
          </CardContent>

          <CardFooter className="mt-5">
            <SubmitButton title="Create Product" />
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
