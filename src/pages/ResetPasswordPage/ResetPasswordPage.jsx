import { Helmet } from 'react-helmet-async';
import css from './ResetPasswordPage.module.css';
import { Container } from '../../components/Container/Container.jsx';
import { Page } from '../../components/Page/Page.jsx';
import { AdvantagesSection } from '../../components/AdvantagesSection/AdvantagesSection.jsx';
import { ResetPasswordForm } from '../../components/ResetPasswordForm/ResetPasswordForm.jsx';

export default function ResetPasswordPage() {
  return (
    <Container>
      <Helmet>
        <title>Password reset</title>
      </Helmet>

      <Page>
        <div className={css.laptop}>
          <ResetPasswordForm />
          <div className={css.picture}>
            <AdvantagesSection />
          </div>
        </div>
      </Page>
    </Container>
  );
}