const waitlistService = require("../services/waitlist.service");

const joinWaitlist = async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    const waitlist = await waitlistService.createWaitlist(req.body);

    console.log("Saved Data:", waitlist);

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