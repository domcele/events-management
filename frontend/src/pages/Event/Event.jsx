import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Event = () => {
  const { id } = useParams(); // Extracting the id parameter from the URL
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/events/${id}`) // Fetching the specific event based on the id
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Event not found");
        }
        return resp.json();
      })
      .then((response) => {
        console.log(response);
        setEvent(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]); // Adding id as a dependency to re-fetch data when id changes

  if (!event) {
    return <div>Loading...</div>; // Render a loading indicator while fetching data
  }

  return (
    <div>
      <h1>{event.name}</h1>
      <p>Date: {event.date}</p>
      <p>Location: {event.location}</p>
      <p>Price: {event.price}</p>
    </div>
  );
};

export default Event;
