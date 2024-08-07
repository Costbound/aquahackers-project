import Logo from '../Logo/Logo.jsx'
import css from './SectionWithLogo.module.css'

function SectionWithLogo({className, children}) {
    return (
        <section className={`${css.section} ${className}`}>
            <Logo />
            {children}
        </section>
    );
}

export default SectionWithLogo;