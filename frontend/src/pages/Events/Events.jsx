// import EventsRow from "./EventsRow";
import { useState, useEffect } from "react";
import EventsRow from "./EventsRow";

const Events = () => {
  const [events, setEvents] = useState([]);

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
      ;
    </div>
  );
};

export default Events;
