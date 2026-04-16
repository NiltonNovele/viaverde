import { Hero } from "./components/Hero";
import AppMargin from "./components/AppMargin";
import WhatsAppBanner from "./components/WhatsappBanner";

export default function Home() {
  return (
    <AppMargin>
      <Hero />
      <WhatsAppBanner />
    </AppMargin>
  );
}
