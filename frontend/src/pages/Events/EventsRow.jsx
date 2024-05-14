import PropTypes from "prop-types";
import { Link, generatePath } from "react-router-dom";
import { ROUTES } from "../../routes/consts";
import styles from "./EventsRow.module.scss";
import { VscAccount } from "react-icons/vsc";
import { VscLocation } from "react-icons/vsc";
import { VscCalendar } from "react-icons/vsc";

const EventsRow = ({ event }) => {
  const orderPath = generatePath(ROUTES.EVENT, { id: event._id });
  const userCount = event.users ? event.users.length : 0;

  return (
    <div className={styles.rowContainer}>
      <div className={styles.rowImage}>
        <img src={event.image} alt={event.name} />
      </div>
      <div className={styles.rowList}>
        <Link to={orderPath}>
          <h2>{event.name}</h2>
        </Link>
        <div className={styles.locationContainer}>
          <VscLocation className={styles.locationLogo} />
          <p>{event.location}</p>
        </div>
        <div className={styles.usersContainer}>
          <VscAccount className={styles.usersLogo} />
          <p>{userCount}</p>
        </div>
        <div className={styles.dateContainer}>
          <VscCalendar className={styles.dateLogo} />
          <p>{event.date}</p>
        </div>
      </div>
    </div>
  );
};

EventsRow.propTypes = {
  event: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    users: PropTypes.array.isRequired,
    date: PropTypes.string.isRequired,
  }),
};

export default EventsRow;
