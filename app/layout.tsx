import type React from "react";
import type {Metadata} from "next";
import {Inter} from "next/font/google";
import StyledComponentsRegistry from "@/lib/registry";
import {AuthProvider} from "@/contexts/auth-context";
import {FilterProvider} from "@/contexts/filter-context";

import "./globals.css";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Dashboard Financeiro",
  description: "Dashboard financeiro para análise de transações",
  icons: "/favicon.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <AuthProvider>
            <FilterProvider>{children}</FilterProvider>
          </AuthProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
