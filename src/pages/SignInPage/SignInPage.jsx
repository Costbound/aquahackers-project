import css from "./SignInPage.module.css";
import { AdvantagesSection } from "../../components/AdvantagesSection/AdvantagesSection";
import SignInForm from "../../components/SignInForm/SignInForm";
import { Helmet } from "react-helmet-async";
import screenWidth from "../../helpers/screenWidth.js";
import SectionWithLogo from "../../components/SectionWithLogo/SectionWithLogo.jsx";

function SignInPage() {

  return (
    <>
      <Helmet>
        <title>AquaTrack</title>
      </Helmet>
            <SectionWithLogo className={css.signInSection}>
                <SignInForm/>
            </SectionWithLogo>
            {screenWidth > 1439 && <AdvantagesSection/>}
    </>
  );
}

export default SignInPage;
