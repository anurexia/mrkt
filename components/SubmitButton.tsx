"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

const SubmitButton = ({ title }: { title: string }) => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please Wait
        </Button>
      ) : (
        <Button type="submit">{title}</Button>
      )}
    </>
  );
};
export default SubmitButton;

export const BuyButton = ({ price }: { price: number }) => {
  const { pending } = useFormStatus();

  return pending ? (
    <Button size="lg" disabled className="mt-10 w-full">
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Please Wait
    </Button>
  ) : (
    <Button type="submit" size="lg" className="mt-10 w-full">
      Buy for ${price}
    </Button>
  );
};
