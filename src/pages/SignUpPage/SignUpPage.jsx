import css from "./SignUpPage.module.css";
import { AdvantagesSection } from "../../components/AdvantagesSection/AdvantagesSection";
import { Helmet } from "react-helmet-async";

import SignUpForm from "../../components/SignUpForm/SignUpForm";
import screenWidth from "../../helpers/screenWidth.js";
import SectionWithLogo from "../../components/SectionWithLogo/SectionWithLogo.jsx";

function SignUpPage() {
  return (
    <>
      <Helmet>
        <title>AquaTrack</title>
      </Helmet>
          <SectionWithLogo className={css.sighnUpSection}>
              <SignUpForm />
          </SectionWithLogo>
          {screenWidth > 1439 && <AdvantagesSection/>}
    </>
  );
}

export default SignUpPage;
