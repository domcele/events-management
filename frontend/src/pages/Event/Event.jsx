import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Event = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

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
        {/* You can add more event details here */}
      </div>
    </>
  );
};

export default Event;
