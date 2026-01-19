import CallToAction from "./CallToAction";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import Stats from "./Stats";
import WhyDonate from "./WhyDonate";

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
