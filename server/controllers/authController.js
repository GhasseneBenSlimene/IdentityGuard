const User = require("../models/user");
const { hashPassowrd, comparePassword } = require("../helpers/auth");

const test = (req, res) => {
  res.json("test is working");
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });
    if (!password)
      return res.status(400).json({ error: "Password is required" });
    const user = await User.findOne({ email: email });
    if (!user)
      return res.status(404).json("User not found, Please register first");
    const hashed = user.password;
    const match = await comparePassword(password, hashed);
    const userResponse = User.findById(user._id).select("name email");
    if (match) return res.json(user);
    else
      return res
        .status(401)
        .json({ error: "Invalid credentials, Please try again" });
  } catch (error) {
    console.log(`Login error: ${error}`);
    return res
      .status(500)
      .json({ error: "Server error, please try again later" });
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // valdiate the user input and return a json response
    if (!name) {
      return res.status(400).json({
        error: "Name is required",
      });
    }
    if (!password || password.length < 6) {
      return res.status(400).json({
        error: "Password is required and should be at least 6 characters long",
      });
    }
    if (!email) {
      return res.status(400).json({
        error: "Email is required",
      });
    }
    const exist = await User.findOne({ email }); //find the first document if it exists
    if (exist) {
      return res.status(409).json({
        error: "Email is taken already",
      });
    }

    const hashedPassword = await hashPassowrd(password);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const userResponse = await User.findById(user._id).select("name email");

    return res.json(userResponse);
  } catch (error) {
    console.log(`Register error: ${error}`);
    return res
      .status(500)
      .json({ error: "Server error, please try again later" });
  }
};

module.exports = {
  test,
  registerUser,
  loginUser,
};
