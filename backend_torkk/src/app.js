const express = require("express")
const waitlistRoutes = require("./routes/waitlist.routes")
const cors = require("cors");

const app = express()

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

app.use(express.json());
app.use("/api/waitlist", waitlistRoutes);


module.exports = app;