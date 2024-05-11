const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const teamRoutes = require("./routes/teamRoutes");

const app = express();
app.use(express.json());

// Routes
app.use(teamRoutes);

// MongoDB connection
const PORT = process.env.PORT || 3000;
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.gxjlxqy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    app.listen(PORT);
  })
  .catch((err) => console.log(err));
