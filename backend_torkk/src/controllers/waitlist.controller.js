const waitlistService = require("../services/waitlist.service");

const joinWaitlist = async (req, res) => {
  try {
    const waitlist = await waitlistService.createWaitlist(req.body);

    res.status(201).json({
      success: true,
      message: "Joined Waitlist Successfully",
      data: waitlist,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "This email is already on the waitlist.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};

module.exports = {
  joinWaitlist,
};
