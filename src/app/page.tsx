import { Hero } from "./components/Hero";
import { How } from "./components/How";
import SearchBar from "./components/SearchBar";
import WhatsAppBanner from "./components/WhatsappBanner";

export default function Home() {
  return (
    <div className="w-full px-4 py-10">
      <Hero />
      <SearchBar />
      <How />
      <WhatsAppBanner />
    </div>
  );
}
