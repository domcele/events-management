import { API } from "./consts";

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

export const updateEvent = async (id, updatedEvent) => {
  const response = await fetch(`${API}/events/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedEvent),
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
    const response = await fetch(`${API}/events/${id}/new-user`, {
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

export const deleteUser = async (id, userId) => {
  const response = await fetch(`${API}/events/${id}/users/${userId}`, {
    method: "DELETE",
  });
  return await response.json();
};
