import { WelcomeSection } from "../../components/WelcomeSection/WelcomeSection";
import { AdvantagesSection } from "../../components/AdvantagesSection/AdvantagesSection";
import { Helmet } from "react-helmet-async";

function HomePage() {
  return (
    <>
      <Helmet>
        <title>AquaTracker</title>
      </Helmet>
        <WelcomeSection />
        <AdvantagesSection />
    </>
  );
}

export default HomePage;
