import BackgroundVideo from "../components/mainframe/BackgroundVideo";
import Navbar from "../components/mainframe/Navbar";
import Hero from "../components/mainframe/Hero";

export default function Mainframe() {
  return (
    <div className="relative min-h-screen w-full">
      <BackgroundVideo />
      <Navbar />
      <Hero />
    </div>
  );
}