import type { Metadata } from "next";

import { Pretendard } from "@/shared/assets/font/font";
import Providers from "@/shared/providers";
import "./globals.css";
import { GlobalComponents } from "@/shared/ui";

export const metadata: Metadata = {
  title: "PLANIT",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
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
};

export default RootLayout;
