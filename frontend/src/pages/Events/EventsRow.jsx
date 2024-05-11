import PropTypes from "prop-types";
import { Link, generatePath } from "react-router-dom";
import { ROUTES } from "../../routes/consts";

const EventsRow = ({ event }) => {
  const orderPath = generatePath(ROUTES.EVENT, { id: event._id });

  return (
    <div>
      <Link to={orderPath}>
        <h3>
          {event.name} {event.location}
        </h3>
      </Link>
    </div>
  );
};

EventsRow.propTypes = {
  event: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
  }),
};

export default EventsRow;
