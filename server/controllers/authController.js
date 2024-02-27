const User = require("../models/user");

const test = (req, res) => {
  res.json("test is working");
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log({ name, email, password });
    // valdiate the user input and return a json response
    if (!name) {
      return res.status(400).json({
        error: "name is required",
      });
    }
    if (!password || password.length < 6) {
      return res.status(400).json({
        error: "password is required and should be at least 6 characters long",
      });
    }
    if (!email) {
      return res.status(400).json({
        error: "email is required",
      });
    }
    const exist = await User.findOne({ email }); //find the first document if it exists
    if (exist) {
      return res.status(409).json({
        error: "Email is taken already",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Server error, please try again later");
  }
};

module.exports = {
  test,
  registerUser,
};
