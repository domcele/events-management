import { useNavigate } from "react-router-dom";
import { createUser } from "../../api/event";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ROUTES } from "../../routes/consts";

const AddUser = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, age } = e.target;
    const user = {
      name: name.value,
      email: email.value,
      age: age.value,
    };
    try {
      await createUser(id, user); // Pass the event ID extracted from URL
      navigate(ROUTES.HOME);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h2>{event.name}</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" />
        <input name="email" placeholder="Email" />
        <input name="age" placeholder="Age" />
        <button type="submit">Create new user</button>
      </form>
    </>
  );
};

export default AddUser;
