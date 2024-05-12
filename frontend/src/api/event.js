import { API } from "./consts";

// POST API/events
export const createEvent = async (event) => {
  const response = await fetch(`${API}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });
  return await response.json();
};
