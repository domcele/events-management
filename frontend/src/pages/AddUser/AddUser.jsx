import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createUser } from "../../api/event"; // Assuming the path to your API functions

const AddUser = () => {
  const { id } = useParams(); // Extract event ID from URL params
  const navigate = useNavigate(); // Hook for navigation
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
      await createUser(id, user); // Call API function to create user
      navigate(`/events/${id}`); // Redirect to event page after user creation
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={user.age}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddUser;
