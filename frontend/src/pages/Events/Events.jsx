import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/consts";
import { useState, useEffect } from "react";
import { deleteEvent } from "../../api/event";
import EventsRow from "./EventsRow";
import Button from "../../components/Button/Button";
import styles from "./Events.module.scss";

const Events = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/events")
      .then((resp) => resp.json())
      .then((response) => {
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
      <div className={styles.eventContainer}>
        <div className={styles.eventButton}>
          <Button color="secondary" onClick={() => navigate(ROUTES.NEW_EVENT)}>
            Create New Event
          </Button>
        </div>
        {events.map((event) => (
          <div className={styles.card} key={event._id}>
            <div className={styles.cardContent}>
              <div className={styles.eventInfo}>
                <EventsRow event={event} />
              </div>
              <div className={styles.deleteButton}>
                <Button
                  color="alert"
                  onClick={() => handleDeleteEvent(event._id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
