import css from "./SignUpPage.module.css";
import { AdvantagesSection } from "../../components/AdvantagesSection/AdvantagesSection";
import Page from "../../components/Page/Page";
import { Helmet } from "react-helmet-async";

import SignUpForm from "../../components/SignUpForm/SignUpForm";
import screenWidth from "../../helpers/screenWidth.js";
import SectionWithLogo from "../../components/SectionWithLogo/SectionWithLogo.jsx";

function SignUpPage(props) {
  return (
    <>
      <Helmet>
        <title>AquaTrack</title>
      </Helmet>
      <Page>
          <SectionWithLogo className={css.sighnUpSection}>
              <SignUpForm />
          </SectionWithLogo>
          {screenWidth > 1439 && <AdvantagesSection/>}
      </Page>
    </>
  );
}

export default SignUpPage;
