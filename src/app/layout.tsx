import type { Metadata } from "next";
import { ReactQueryProvider } from "@/providers";

import "../styles/globals.scss";

export const metadata: Metadata = {
  title: "Meeting App",
  description: "Simple Clone of Google Meet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <main className="flex flex-1 flex-col">{children}</main>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
