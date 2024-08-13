import { useState, useEffect } from "react";
import css from "./SignInPage.module.css";
import { AdvantagesSection } from "../../components/AdvantagesSection/AdvantagesSection";
import SignInForm from "../../components/SignInForm/SignInForm";
import { Helmet } from "react-helmet-async";
import SectionWithLogo from "../../components/SectionWithLogo/SectionWithLogo.jsx";

function SignInPage() {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1439);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 1439);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>AquaTrack</title>
      </Helmet>
      <SectionWithLogo className={css.signInSection}>
        <SignInForm />
      </SectionWithLogo>
      {isLargeScreen && <AdvantagesSection />}
    </>
  );
}

export default SignInPage;
