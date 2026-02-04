import { use } from "react";
import CallToAction from "../components/CallToAction";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Stats from "../components/Stats";
import WhyDonate from "../components/WhyDonate";
import AuthProvider, { AuthContext } from "../context/AuthContext";

const Home = () => {

  return (
    <>
      <Hero></Hero>
      <Stats></Stats>
      <HowItWorks></HowItWorks>
      <WhyDonate></WhyDonate>
      <CallToAction></CallToAction>
    </>
  );
};

export default Home;
