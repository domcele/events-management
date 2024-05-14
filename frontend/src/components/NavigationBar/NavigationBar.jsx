import { Link } from "react-router-dom";
import CalendarLogo from "../../assets/calendar-logo.png";
import styles from "./NavigationBar.module.scss";
import { navigationBarLinks } from "../../routes/consts";
import Button from "../Button/Button";

const NavigationBar = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img src={CalendarLogo} alt="Calendar logo" />
      </div>
      <nav className={styles.nav}>
        {navigationBarLinks.map((link) => (
          <Link className={styles.list} key={link.path} to={link.path}>
            {link.title}
          </Link>
        ))}
        <Button color="third">Log Out</Button>
      </nav>
    </header>
  );
};

export default NavigationBar;
