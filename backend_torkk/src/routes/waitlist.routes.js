const express = require("express");
const Waitlist = require("../models/Waitlist");

const { joinWaitlist } = require("../controllers/waitlist.controller");

const router = express.Router();

router.post("/join", joinWaitlist);
router.get("/all", async (req, res) => {
  const Waitlist = require("../models/Waitlist");

  const data = await Waitlist.find();

  res.json(data);
});

module.exports = router;
