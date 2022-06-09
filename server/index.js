require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const port = process.env.PORT || 3000;

//Routes
const userRoutes = require("./api/userRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hellow");
});

app.use("/users", userRoutes);

mongoose
  .connect(process.env.MONGODB, { useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () => {
      console.log("Server is running on port: " + port);
    });
  })
  .catch((err) => console.log(err));
