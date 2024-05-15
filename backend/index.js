const express = require("express");
const cors = require("cors");
const eventUserRoutes = require("./routes/eventUserRoutes");
require("dotenv").config();

const app = express();
app.use(express.json()); // must
app.use(cors()); // must
const port = process.env.PORT || 8080;

// app.use("/eventUsers", eventUserRoutes);
app.use("/events", eventUserRoutes);

app.listen(port, () => {
  console.log(`Server is running on ${port} port`);
});
