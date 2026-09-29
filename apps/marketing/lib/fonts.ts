import localFont from "next/font/local";

export const chakraPetch = localFont({
  src: [
    {
      path: "../fonts/ChakraPetch-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/ChakraPetch-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/ChakraPetch-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/ChakraPetch-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-chakra-petch",
  display: "swap",
});
