import localFont from "next/font/local";

export const Pretendard = localFont({
  src: [
    {
      path: "../assets/font/pretendard/woff2/Pretendard-Light.subset.woff2",
      weight: "300",
    },
    {
      path: "../assets/font/pretendard/woff2/Pretendard-Regular.subset.woff2",
      weight: "400",
    },
    {
      path: "../assets/font/pretendard/woff2/Pretendard-Medium.subset.woff2",
      weight: "500",
    },
    {
      path: "../assets/font/pretendard/woff2/Pretendard-SemiBold.subset.woff2",
      weight: "600",
    },
    {
      path: "../assets/font/pretendard/woff2/Pretendard-Bold.subset.woff2",
      weight: "700",
    },
  ],
  display: "swap",
  variable: "--font-pretendard",
});
