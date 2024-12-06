"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { z } from "zod";
import prisma from "./lib/db";
import { type CategoryTypes } from "@prisma/client";
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";

// create a state for errors
export type State = {
  status: "error" | "success" | undefined;
  errors?: {
    [key: string]: string[];
  };
  message?: string | null;
};

// - create the schema
const productSchema = z.object({
  name: z
    .string()
    .min(5, { message: "The length of the name must have a minimum of 5" }),

  category: z.string().min(1, { message: "Category is required" }),

  price: z.number().min(0, { message: "Price must be bigger than 0" }),

  shortDescription: z
    .string()
    .min(10, { message: "Please summarize your product" }),

  description: z.string().max(200, { message: "Description too long" }),

  images: z.array(z.string(), { message: "Images are required" }),

  productFile: z
    .string()
    .min(1, { message: "Please upload a compressed file of your product" }),
});

// - get the form data
export const sellProduct = async (prevState: any, formData: FormData) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("Something wen't wrong!");
  }

  // - validate it
  const validateFields = productSchema.safeParse({
    name: formData.get("name"),
    // - if you can't put name in a form, use an input with type of hidden
    category: formData.get("category"),
    // - forms return string just like other elements, so it must be converted first
    price: Number(formData.get("price")),
    shortDescription: formData.get("shortDescription"),
    description: formData.get("description"),
    images: JSON.parse(formData.get("images") as string),
    productFile: formData.get("productFile"),
  });

  if (!validateFields.success) {
    const state: State = {
      status: "error",
      // - get the errors coming from the validated fields
      errors: validateFields.error.flatten().fieldErrors,
      message: "There seems to be a problem with your inputs...",
    };

    return state;
  }

  await prisma.product.create({
    data: {
      name: validateFields.data.name,
      price: validateFields.data.price,
      short_description: validateFields.data.shortDescription,
      description: JSON.parse(validateFields.data.description),
      images: validateFields.data.images,
      product_file: validateFields.data.productFile,
      category: validateFields.data.category as CategoryTypes,
      userId: user.id,
    },
  });

  // - if it's successful
  const state: State = {
    status: "success",
    message: "The product has been created!",
  };

  return state;
};

// - for user settings
const userSettingsSchema = z.object({
  // - make it optional
  firstName: z
    .string()
    .min(3, { message: "Must have a minimum of 3 characters" })
    .or(z.literal(""))
    .optional(),

  lastName: z
    .string()
    .min(3, { message: "Must have a minimum of 3 characters" })
    .or(z.literal(""))
    .optional(),
});

export const updateUserSettings = async (
  prevState: any,
  formData: FormData,
) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) throw new Error("Something wen't wrong!");

  const validatedFields = userSettingsSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
  });

  if (!validatedFields.success) {
    const state: State = {
      status: "error",
      errors: validatedFields.error.flatten().fieldErrors,
      message: "There seems to be a problem with your inputs...",
    };

    return state;
  }

  // - update the user if it's successful
  const data = await prisma.user.update({
    where: { id: user.id },
    data: {
      first_name: validatedFields.data.firstName as string,
      last_name: validatedFields.data.lastName as string,
    },
  });

  const state: State = {
    status: "success",
    message: "Settings has been updated",
  };

  return state;
};

export const BuyProduct = async (formData: FormData) => {
  const id = formData.get("id") as string;

  // get the product first since we also want users that isn't logged in to be able to check out products
  const data = await prisma.product.findUnique({
    where: {
      id,
    },
    select: {
      name: true,
      price: true,
      short_description: true,
      images: true,
    },
  });

  // create the checkout session
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: Math.round((data?.price as number) * 100),
          product_data: {
            name: data?.name as string,
            description: data?.short_description,
            images: data?.images,
          },
        },
        quantity: 1,
      },
    ],
    success_url: "http://localhost:3000/payment/success",
    cancel_url: "http://localhost:3000/payment/cancel",
  });

  // session.url is the url where it uses the checkout provided by stripe
  return redirect(session.url as string);
};

export const CreateStripeAccountLink = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("Something wen't wrong!");
  }

  const data = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      connectedAccountId: true,
    },
  });

  const accountLink = await stripe.accountLinks.create({
    account: data?.connectedAccountId as string,
    // - where user gets redirected to connect them again to the onboarding
    refresh_url: "http://localhost:3000/billing",
    return_url: `http://localhost:3000/return/${data?.connectedAccountId}`,
    type: "account_onboarding",
  });

  return redirect(accountLink.url);
};
