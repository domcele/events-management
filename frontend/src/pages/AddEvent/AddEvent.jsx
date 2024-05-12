import { useNavigate } from "react-router-dom";
import { createEvent } from "../../api/event";
import { ROUTES } from "../../routes/consts";

const AddEvent = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, date, location, price } = e.target;
    const event = {
      name: name.value,
      date: date.value,
      location: location.value,
      price: price.value,
    };
    try {
      await createEvent(event);
      navigate(ROUTES.HOME);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" />
      <input name="date" placeholder="Date" />
      <input name="location" placeholder="Location" />
      <input name="price" placeholder="Price" />
      <button type="submit">Create new Event</button>
    </form>
  );
};

export default AddEvent;
