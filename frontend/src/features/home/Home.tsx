import HomeNavbar from "./HomeNavbar";
import HomeHero from "./HomeHero";
import HomeFeatures from "./HomeFeatures";
import HomeExample from "./HomeExample";
import HomeCTA from "./HomeCTA";
import HomeFooter from "./HomeFooter";

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <HomeNavbar />
      <HomeHero />
      <HomeFeatures />
      <HomeExample />
      <HomeCTA />
      <HomeFooter />
    </div>
  );
};

export default Home;
