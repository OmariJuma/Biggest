import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer, Header } from "@/components";
import SessionProvider from "@/utils/SessionProvider";
import Providers from "@/Providers";
import { getServerSession } from "next-auth";
import 'svgmap/dist/svgMap.min.css';
import Script from "next/script";




const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Biggest eStore",
  description: "Welcome to the future of shopping in Africa",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession();
  return (
    <html lang="en" data-theme="light">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <Header />
          <Providers>
            {children}
            <Script id="chat-widget-env" strategy="beforeInteractive">
              {`window.NEXT_PUBLIC_CHATBOT_URI = "${process.env.NEXT_PUBLIC_CHATBOT_URI}";`}
            </Script>
            <div id="chat-widget-container"></div>
            <Script src="/chat-widget.js" strategy="afterInteractive" />
          </Providers>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
