import { useState, useEffect } from "react";
import css from "./SignUpPage.module.css";
import { AdvantagesSection } from "../../components/AdvantagesSection/AdvantagesSection";
import { Helmet } from "react-helmet-async";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import SectionWithLogo from "../../components/SectionWithLogo/SectionWithLogo.jsx";

function SignUpPage() {
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
      <SectionWithLogo className={css.sighnUpSection}>
        <SignUpForm />
      </SectionWithLogo>
      {isLargeScreen && <AdvantagesSection />}
    </>
  );
}

export default SignUpPage;
