import css from "./HomePage.module.css";
import { WelcomeSection } from "../../components/WelcomeSection/WelcomeSection";
import { AdvantagesSection } from "../../components/AdvantagesSection/AdvantagesSection";
import { Helmet } from "react-helmet-async";
import Page from "../../components/Page/Page";
import WaterModal from "../../components/WaterModal/WaterModal.jsx";
import Modal from "../../components/Modal/Modal.jsx";

function HomePage() {
  return (
    <>
        <Modal isOpen={true}>
            <WaterModal type='add' waterId={'id'} waterAmount={700} date={'2022-06-23T23:27'} />
        </Modal>
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
