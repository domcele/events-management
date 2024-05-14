import { useNavigate } from "react-router-dom";
import { createEvent } from "../../api/event";
import { ROUTES } from "../../routes/consts";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import styles from "./AddEvent.module.scss";

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
    <div className={styles.addEventContainer}>
      <form className={styles.addEventForm} onSubmit={handleSubmit}>
        <h2 className={styles.addEventTitle}>Add Event</h2>
        <Input type="text" id="name" name="name" label="Name" required />
        <Input type="date" id="date" name="date" label="Date" required />
        <Input
          type="text"
          id="location"
          name="location"
          label="Location"
          required
        />
        <Input type="number" id="price" name="price" label="Price" required />
        <Input type="text" id="url" name="imgUrl" label="Image URL" required />
        <div className={styles.buttonContainer}>
          <Button color="secondary" type="submit">
            Create new Event
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddEvent;
