import { Work_Sans, Roboto_Slab } from "next/font/google";
import "./globals.css";
import Navigation from "../partials/navigation";
import FooterComponent from "../partials/footer_component";

const headingFont = Work_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
});

const textFont = Roboto_Slab({
  variable: "--font-text",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" sizes="any" />
      </head>
      <body
        className={`${headingFont.variable} ${textFont.variable} antialiased min-h-screen flex flex-col`}
      >
      <Navigation />
      <section className="max-w-7xl mx-auto my-8">
        {children}
      </section>
      <FooterComponent />
      </body>
    </html>
  );
}
