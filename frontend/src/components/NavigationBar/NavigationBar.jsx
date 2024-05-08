import { Link } from "react-router-dom";
import CalendarLogo from "../../assets/calendar-logo.png";
import styles from "./NavigationBar.module.scss";
import { navigationBarLinks } from "../../routes/consts";

const NavigationBar = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img src={CalendarLogo} alt="Calendar logo" />
      </div>
      <nav className={styles.nav}>
        {navigationBarLinks.map((link) => (
          <Link key={link.path} to={link.path}>
            {link.title}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default NavigationBar;
