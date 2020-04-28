const express = require("express");
const bodyParser = require("body-parser");
const cron = require("node-cron");
const cors = require("cors");
const updateData = require("./utils/update-data");
const path = require("path");
const app = express();

app.use(
  cors({
    origin: ["https://localhost:3000", "http://yourapp.com"],
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).send("Welcome to our restful API");
});

app.get("/global", (req, res) => {
  res.header("Content-Type", "application/json");
  res.sendFile(path.join(__dirname, "data/global.json"));
});

// Cron job @ 00:05 everyday
// Use * * * * * to run every minute for testing
cron.schedule("00 05 * * *", () => updateData());

const server = app.listen(3001, () => {
  console.log("listening on port %s...", server.address().port);
});
