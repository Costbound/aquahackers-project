import css from "./HomePage.module.css";
import { WelcomeSection } from "../../components/WelcomeSection/WelcomeSection";
import { AdvantagesSection } from "../../components/AdvantagesSection/AdvantagesSection";
import { Helmet } from "react-helmet-async";
import Page from "../../components/Page/Page";
import WaterFormFormik from "../../components/WaterForm/WaterFormFormik";

function HomePage() {
  return (
    <>
      <WaterFormFormik/>
      <Helmet>
        <title>AquaTracker</title>
      </Helmet>
      <Page>
        <WelcomeSection />
        <AdvantagesSection />
      </Page>
    </>
  );
}

export default HomePage;
