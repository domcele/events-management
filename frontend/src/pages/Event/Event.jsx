import { ROUTES } from "../../routes/consts";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteUser } from "../../api/event";
import { useParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import styles from "./Event.module.scss";

const Event = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [eventUsers, setEventUsers] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/events/${id}`)
      .then((resp) => resp.json())
      .then((response) => {
        console.log(response);
        setEvent(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:3000/events/${id}/users`) // Fetch event users based on the event ID
      .then((resp) => resp.json())
      .then((response) => {
        console.log(response);
        setEventUsers(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(id, userId); // Pass both event ID and user ID
      setEventUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== userId)
      ); // Filter users based on user ID
    } catch (error) {
      console.error(error);
    }
  };

  if (!event) {
    return (
      <p>
        Event with id <strong>{id}</strong> not found.
      </p>
    );
  }

  return (
    <div className={styles.eventContainer}>
      <Link
        className={styles.eventButton}
        to={`${ROUTES.NEW_USER.replace(":id", id)}`}
      >
        Add user
      </Link>
      <div className={styles.card}>
        <h2>{event.name}</h2>
        <div className={styles.cardContent}>
          <img src={event.image} alt={event.name} />
          <p className={styles.eventInfo}>Location: {event.location}</p>
          <p className={styles.eventInfo}>Date: {event.date}</p>
          <p className={styles.eventInfo}>Price: {event.price}</p>
          {eventUsers.length > 0 ? (
            <ul className={styles.eventUserInfo}>
              {eventUsers.map((user) => (
                <li key={user._id}>
                  <div>
                    Name: {user.name}, Email: {user.email}, Age: {user.age}
                  </div>
                  <div>
                    <Button
                      color="alert"
                      onClick={() => handleDeleteUser(user._id)}
                      className={styles.deleteButton}
                    >
                      delete
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No users</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Event;
