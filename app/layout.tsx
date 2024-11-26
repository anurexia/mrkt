import type { Metadata } from "next";
// import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "./AuthProvider";

import { Roboto, Roboto } from "next/font/google";

// - upload thing imports to improve SSR
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { Toaster } from "@/components/ui/sonner";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });

// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

const roboto = Roboto({
  display: "swap",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "MRKT",
  description: "A digital marketplace ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={`${roboto.className} antialiased`}>
          <NextSSRPlugin
            /**
             * The `extractRouterConfig` will extract **only** the route configs
             * from the router to prevent additional information from being
             * leaked to the client. The data passed to the client is the same
             * as if you were to fetch `/api/uploadthing` directly.
             */
            routerConfig={extractRouterConfig(ourFileRouter)}
          />
          <Navbar />
          <main>{children}</main>
          <Toaster
            closeButton
            duration={3000}
            position="top-right"
            richColors
            theme="light"
          />
        </body>
      </html>
    </AuthProvider>
  );
}
