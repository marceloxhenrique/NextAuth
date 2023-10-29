import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in page",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <body>{children}</body>;
}
