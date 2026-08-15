import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Hero from "./Hero";
import FeaturedPlaces from "./FeaturedPlaces";
import PopularHotels from "./PopularHotels";
import Testimonials from "./Testimonails";
import "./Home.css";

function Home() {
  return (
    <>
      <Navbar />
      <main>
      <Hero />
      <FeaturedPlaces />
      <PopularHotels />
      <Testimonials />
      </main>
      <Footer />
    </>
  );
}

export default Home;
