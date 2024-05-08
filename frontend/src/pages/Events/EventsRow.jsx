import PropTypes from "prop-types";
import { Link, generatePath } from "react-router-dom";
import { ROUTES } from "../../routes/consts";
import { useState, useEffect } from "react";

const EventsRow = ({ event }) => {
  const orderPath = generatePath(ROUTES.EVENTS, { id: event.id });
  const [eventUsers, setEventUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/eventUsers")
      .then((resp) => resp.json())
      .then((response) => {
        console.log(response);
        setEventUsers(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <Link to={orderPath}>
        {eventUsers.map((eventUser) => (
          <div key={eventUser._id}>
            {" "}
            name: {eventUser.name} email: {eventUser.email} age: {eventUser.age}
          </div>
        ))}
      </Link>
    </div>
  );
};

EventsRow.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
};

export default EventsRow;
