import { Navbar } from "@/components/Navbar";
import { HomeView } from "@/components/HomeView";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white flex flex-col justify-between">
      <Navbar />
      <HomeView />
      <Footer />
    </main>
  );
}
