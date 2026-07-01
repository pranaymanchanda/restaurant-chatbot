import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Menu from "@/components/Menu";
import AiHost from "@/components/AiHost";
import Visit from "@/components/Visit";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Menu />
        <AiHost />
        <Visit />
        <Testimonials />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
