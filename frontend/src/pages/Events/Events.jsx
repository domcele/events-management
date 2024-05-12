import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/consts";
import { useState, useEffect } from "react";
import { deleteEvent } from "../../api/event";
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

  const handleDeleteEvent = async (id) => {
    try {
      await deleteEvent(id);
      setEvents((prevEvents) => prevEvents.filter((event) => event._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        {events.map((event) => (
          <div key={event._id}>
            {" "}
            <EventsRow event={event} />
            <button onClick={() => handleDeleteEvent(event._id)}>delete</button>
          </div>
        ))}
      </div>
      <button onClick={() => navigate(ROUTES.NEW_EVENT)}>
        Create new Event
      </button>
    </div>
  );
};

export default Events;
