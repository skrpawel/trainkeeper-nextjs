// These styles apply to every route in the application
import "@/styles/globals.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import AuthStatus from "@/components/auth-status";
import { Suspense } from "react";
import Navbar from "@/components/navbar/navbar";
import { GlobalContextProvider } from "./context/store";
import { Footer } from "@/components/footer/footer";
import Provider from "./context/client-provider";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const title = process.env.appName;
const description =
  "This is a Next.js starter kit that uses Next-Auth for simple email + password login and a Postgres database to persist the data.";

export const metadata: Metadata = {
  title,
  description,
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  metadataBase: new URL("https://nextjs-postgres-auth.vercel.app"),
  themeColor: "#FFF",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.variable}>
        <div className="min-h-screen">
          <GlobalContextProvider>
            <Provider session={session}>
              <Toaster />
              <Suspense fallback="Loading...">
                {/* @ts-expect-error Async Server Component */}
                <AuthStatus />
              </Suspense>
              <Navbar />
              {children}
            </Provider>
            <Footer />
          </GlobalContextProvider>
        </div>
      </body>
    </html>
  );
}
