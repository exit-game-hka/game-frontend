import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import "@fontsource/inter";
import React from "react";
import {ApplicationContainerComponent} from "@/components/ApplicationContainerComponent";
import ThemeRegistry from "@/app/ThemeRegistry";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const RootLayout = ({
                      children,
                    }: Readonly<{
  children: React.ReactNode;
}>)  => {
  return (
      <html lang="en">
      {/*<link rel="preconnect" href="https://fonts.googleapis.com" />*/}
      {/*<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />*/}
      {/*<link*/}
      {/*    rel="stylesheet"*/}
      {/*    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"*/}
      {/*  />*/}
      <body className={inter.className}>
      <ThemeRegistry options={{ key: "joy" }}>
          <ApplicationContainerComponent>
              {children}
          </ApplicationContainerComponent>
      </ThemeRegistry>
      </body>
      </html>
  );
}

export default RootLayout;
