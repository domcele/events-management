import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/consts";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Event = () => {
  const navigate = useNavigate();
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
      <button onClick={() => navigate(ROUTES.NEW_USER)}>Add user</button>
      <h2>{event.name}</h2>
      <div>
        <p>Location: {event.location}</p>
        <p>Date: {event.date}</p>
        <p>Price: {event.price}</p>
        {eventUsers.length > 0 ? (
          <ul>
            {eventUsers.map((user) => (
              <li key={user._id}>
                Name: {user.name}, Email: {user.email}, Age: {user.age}
              </li>
            ))}
          </ul>
        ) : (
          <p>No users</p>
        )}
      </div>
    </>
  );
};

export default Event;
