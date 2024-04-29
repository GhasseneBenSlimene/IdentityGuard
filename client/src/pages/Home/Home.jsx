import React from "react";
import Banner from "./components/banner/Banner.jsx";
import Contact from "./components/contact/Contact.jsx";
import Features from "./components/features/Features.jsx";
import Footer from "./components/footer/Footer.jsx";
import FooterBottom from "./components/footer/FooterBottom.jsx";
import Projects from "./components/projects/Projects.jsx";
import Resume from "./components/resume/Resume.jsx";
import Testimonial from "./components/tesimonial/Testimonial.jsx";
import Navbar from "../../components/NavBar.jsx";
export default function Home() {
  return (
    <div className=" bg-bodyColor  px-4">
      <div className="">
        
        <Banner />
        <Features />
        <FooterBottom/>
      </div>
    </div>
  );
}
