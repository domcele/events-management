import { useState, useEffect } from "react";

const App = () => {
  const [eventUsers, setEventUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/eventUsers")
      .then((resp) => resp.json())
      .then((response) => {
        console.log(response);
        setEventUsers(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      {eventUsers.map((eventUser) => (
        <div key={eventUser._id}>
          {" "}
          name: {eventUser.name} email: {eventUser.email} age: {eventUser.age}
        </div>
      ))}
    </div>
  );
};

export default App;
