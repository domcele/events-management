import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createUser } from "../../api/event";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import styles from "./AddUser.module.scss";

const AddUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    age: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(id, user);
      navigate(`/events/${id}`);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className={styles.addUserContainer}>
      <form onSubmit={handleSubmit} className={styles.addUserForm}>
        <h2 className={styles.addUserTitle}>Add User</h2>
        <Input
          type="text"
          id="name"
          name="name"
          label="Name"
          value={user.name}
          onChange={handleChange}
          required
        />
        <Input
          type="email"
          id="email"
          name="email"
          label="Email"
          value={user.email}
          onChange={handleChange}
          required
        />
        <Input
          type="number"
          id="age"
          name="age"
          label="Age"
          value={user.age}
          onChange={handleChange}
          required
        />
        <div className={styles.buttonContainer}>
          <Button color="secondary" type="submit" onClick={() => {}}>
            Add User
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
