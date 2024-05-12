const { ObjectId } = require("mongodb");

const express = require("express");

require("dotenv").config();

const router = express.Router();
const client = require("../config/db");

// router.get("/users", async (req, res) => {
//   try {
//     const data = await client
//       .db("MyDatabase")
//       .collection("events")
//       .aggregate([
//         {
//           $lookup: {
//             from: "users",
//             localField: "userId",
//             foreignField: "_id",
//             as: "user",
//           },
//         },
//         {
//           $unwind: {
//             path: "$user",
//             // preserveNullAndEmptyArrays: true, // show students without an owner
//           },
//         },
//       ])
//       .toArray();
//     return res.send(data);
//   } catch (error) {
//     return res.status(500).send({ error });
//   }
// });

router.get("/:id/users", async (req, res) => {
  const eventId = req.params.id;

  try {
    const data = await client
      .db("MyDatabase")
      .collection("events")
      .aggregate([
        {
          $match: {
            _id: new ObjectId(eventId),
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "users",
          },
        },
        {
          $unwind: {
            path: "$users",
          },
        },
      ])
      .toArray();
    return res.send(data);
  } catch (error) {
    return res.status(500).send({ error });
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

module.exports = router;
