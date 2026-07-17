const Waitlist = require("../models/Waitlist");

const createWaitlist = async (data) => {
  const waitlist = await Waitlist.create(data);

  return waitlist;
};

module.exports = {
  createWaitlist,
};
