import type { Metadata } from "next";

import { checkAuth } from "@/feature/auth/server";
import { Pretendard } from "@/shared/assets/font/font";
import Providers from "@/shared/providers";
import "./globals.css";
import { GlobalComponents } from "@/shared/ui";

export const metadata: Metadata = {
  title: "PLANIT",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await checkAuth();
  return (
    <html lang="ko">
      <body className={Pretendard.className}>
        <Providers>
          <GlobalComponents />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
