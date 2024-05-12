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

export const deleteEvent = async (id) => {
  const response = await fetch(`${API}/events/${id}`, {
    method: "DELETE",
  });
  return await response.json();
};

export const createUser = async (id, user) => {
  try {
    const response = await fetch(`${API}/events/${id}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (error) {
    throw new Error("Error creating user:", error);
  }
};
