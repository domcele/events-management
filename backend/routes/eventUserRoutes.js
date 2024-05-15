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

router.post("/:id/new-user", async (req, res) => {
  const eventId = req.params.id;
  const userData = req.body;

  try {
    const event = await client
      .db("MyDatabase")
      .collection("events")
      .findOne({ _id: new ObjectId(eventId) });

    if (!event) {
      return res.status(404).send({ error: "Event not found" });
    }
    const result = await client
      .db("MyDatabase")
      .collection("users")
      .insertOne(userData);
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

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedEvent = req.body;

  try {
    if (!ObjectId.isValid(id)) {
      return res.status(400).send({ error: "Invalid event ID" });
    }
    const result = await client
      .db("MyDatabase")
      .collection("events")
      .updateOne({ _id: new ObjectId(id) }, { $set: updatedEvent });

    if (result.matchedCount === 0) {
      return res.status(404).send({ error: "Event not found" });
    }

    res.status(200).send({ message: "Event updated successfully" });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).send({ error: "Internal server error" });
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

router.delete("/:id/users/:userId", async (req, res) => {
  const { id, userId } = req.params;

  try {
    const data = await client
      .db("MyDatabase")
      .collection("events")
      .updateOne(
        { _id: new ObjectId(id) },
        { $pull: { users: new ObjectId(userId) } }
      );

    if (data.modifiedCount === 0) {
      return res.status(404).send({ error: "Event or user not found" });
    }

    res.status(200).send({ message: "User removed from event" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

module.exports = router;
