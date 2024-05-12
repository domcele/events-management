import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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

  if (!event) {
    return (
      <p>
        Event with id <strong>{id}</strong> not found.
      </p>
    );
  }

  return (
    <>
      <h2>{event.name}</h2>
      <div>
        <p>Location: {event.location}</p>
        <p>Date: {event.date}</p>
        <p>Price: {event.price}</p>
        <ul>
          {eventUsers.map((event) => (
            <li key={event._id}>
              Name: {event.users.name}, Email: {event.users.email}, Age:
              {event.users.age}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Event;
