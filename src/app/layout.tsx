import { Work_Sans, Roboto_Slab } from "next/font/google";
import "./globals.css";
import Navigation from "../partials/navigation";
import FooterComponent from "../partials/footer_component";
import { verifySession } from "./lib/dal";

const headingFont = Work_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
});

const textFont = Roboto_Slab({
  variable: "--font-text",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await verifySession();
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" sizes="any" />
      </head>
      <body
        className={`${headingFont.variable} ${textFont.variable} antialiased min-h-screen flex flex-col`}
      >
        <Navigation user={user}/>
        <main>
          {children}
        </main>
        <FooterComponent />
      </body>
    </html>
  );
}
