const { ObjectId } = require("mongodb");
const express = require("express");
require("dotenv").config();

const router = express.Router();
const client = require("../config/db");

router.get("/", async (req, res) => {
  try {
    const data = await client
      .db("MyDatabase")
      .collection("eventUsers")
      .find()
      .toArray();
    res.send(data);
  } catch (error) {
    return res.status(500).send({ error });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await client
      .db("MyDatabase")
      .collection("eventUsers")
      .aggregate([
        {
          $lookup: {
            from: "events",
            localField: "eventId",
            foreignField: "_id",
            as: "event",
          },
        },
        {
          $unwind: {
            path: "$event",
            preserveNullAndEmptyArrays: true,
          },
        },
      ])
      .toArray();
    return res.send(data);
  } catch (error) {
    return res.status(500).send({ error });
  }
});

router.post("/", async (req, res) => {
  try {
    const newUser = {
      ...req.body,
      eventId: new ObjectId(`${req.body.eventId}`),
    };
    const dbRes = await client
      .db("MyDatabase")
      .collection("eventUsers")
      .insertOne(newUser);
    res.send(dbRes);
  } catch (err) {
    res.status(500).send({ err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await client
      .db("MyDatabase")
      .collection("eventUsers")
      .deleteOne({ _id: new ObjectId(id) });
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

module.exports = router;
