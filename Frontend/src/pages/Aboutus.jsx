import React from "react";
import AboutHero from "../components/sections/About/AboutHero";
import OurStory from "../components/sections/About/OurStory";
import OurValues from "../components/sections/About/OurValues";
import Achievements from "../components/sections/About/Achievements";

import Process from "../components/sections/About/Process";
import CTA from "../components/sections/About/CTA";

const Aboutus = () => {
  return (
    <>
      <AboutHero />
      <OurStory />
      <OurValues />
      <Achievements />
      <Process />
      <CTA />
    </>
  );
};

export default Aboutus;