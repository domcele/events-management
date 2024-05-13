const { ObjectId } = require("mongodb");

const express = require("express");

require("dotenv").config();

const router = express.Router();
const client = require("../config/db");

router.get("/:id/users", async (req, res) => {
  const eventId = req.params.id;

  try {
    const event = await client
      .db("MyDatabase")
      .collection("events")
      .findOne({ _id: new ObjectId(eventId) });

    if (!event) {
      return res.status(404).send({ error: "Event not found" });
    }

    const userIds = event.users.map((userId) => new ObjectId(userId));

    const userData = await client
      .db("MyDatabase")
      .collection("users")
      .find({ _id: { $in: userIds } })
      .toArray();

    return res.send(userData);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send({ error: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await client
      .db("MyDatabase")
      .collection("events")
      .find()
      .toArray();
    res.send(data);
  } catch (error) {
    return res.status(500).send({ error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await client
      .db("MyDatabase")
      .collection("events")
      .findOne({ _id: new ObjectId(id) });
    res.send(data);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newEvent = req.body;
    const dbRes = await client
      .db("MyDatabase")
      .collection("events")
      .insertOne(newEvent);
    res.send(dbRes);
  } catch (err) {
    res.status(500).send({ error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await client
      .db("MyDatabase")
      .collection("events")
      .deleteOne({ _id: new ObjectId(id) });
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.post("/:id/new-user", async (req, res) => {
  const eventId = req.params.id;
  const userData = req.body;

  try {
    // Check if the event exists
    const event = await client
      .db("MyDatabase")
      .collection("events")
      .findOne({ _id: new ObjectId(eventId) });

    if (!event) {
      return res.status(404).send({ error: "Event not found" });
    }

    // Add the user to the users collection
    const result = await client
      .db("MyDatabase")
      .collection("users")
      .insertOne(userData);

    // Update the event by pushing the new user's ObjectId into the users array
    await client
      .db("MyDatabase")
      .collection("events")
      .updateOne(
        { _id: new ObjectId(eventId) },
        { $push: { users: result.insertedId } }
      );

    res.status(201).send({ message: "User added to event" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
