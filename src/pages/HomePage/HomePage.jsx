import css from "./HomePage.module.css";
import { WelcomeSection } from "../../components/WelcomeSection/WelcomeSection";
import { AdvantagesSection } from "../../components/AdvantagesSection/AdvantagesSection";
import { Helmet } from "react-helmet-async";
import Page from "../../components/Page/Page";
import WaterForm from "../../components/WaterForm/WaterFormFormik";
import WaterModal from "../../components/WaterModal/WaterModal.jsx";

function HomePage() {
  return (
    <>
        <WaterModal type='add'>
            <WaterForm/>
        </WaterModal>
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
