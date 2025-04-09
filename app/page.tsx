import Image from "next/image";
import { Navbar } from "./components/Navbar";
import { TripCard } from "./components/TripCard";
import { DealOfTheWeek } from "./components/Hero";
import { AvailableTripsGrid } from "./components/TripGrid";
import { WhyChooseBhromonTori } from "./components/about";
import { Footer } from "./components/Footer";
export default function Home() {
  return (
    <div>
      <Navbar/>
      <DealOfTheWeek/>
      <AvailableTripsGrid/>
      <WhyChooseBhromonTori/>
      <Footer/>
    </div>
  );
}
