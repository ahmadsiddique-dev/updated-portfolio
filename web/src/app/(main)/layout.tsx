import Navbar from "@/components/elements/Navbar";
import Footer from "@/components/elements/Footer";
import { Analytics } from "@vercel/analytics/next"

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
      <Analytics />
      <Footer />
    </>
  );
}
