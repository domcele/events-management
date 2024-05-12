import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/consts";
import { useState, useEffect } from "react";
import EventsRow from "./EventsRow";

const Events = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/events")
      .then((resp) => resp.json())
      .then((response) => {
        console.log(response);
        setEvents(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <div>
        {events.map((event) => (
          <div key={event._id}>
            {" "}
            <EventsRow event={event} />
          </div>
        ))}
      </div>
      <button onClick={() => navigate(ROUTES.NEW_USER)}>
        Create new Event
      </button>
    </div>
  );
};

export default Events;
