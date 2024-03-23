const User = require("../models/user");
const jwt = require("jsonwebtoken");
const ZKP = require("../ZKP/generate_proof");
const { deleteFile, dir } = require("../handlers/fileHandler");

const getUsersInfo = async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    const user = jwt.verify(token, process.env.JWT_SECRET, {});
    if (user.admin) {
      const users = await User.find({ status: "Pending" })
        .select("-password")
        .lean();
      return res.json(users);
    }
  } else return res.json(null);
};

const verifyAdminSession = (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (token) {
      const user = jwt.verify(token, process.env.JWT_SECRET, {});
      if (user.admin) {
        next();
      } else {
        return res.status(401).json({ error: "Unauthorized" });
      }
    } else return res.status(401).json({ error: "Unauthorized" });
  } catch (error) {
    console.log("Error in verifyAdminSession: ", error);

    return res
      .status(500)
      .json({ error: "verify admin session error, please try again later." });
  }
};

const acceptUser = (req, res, next) => {
  try {
    const { email, dateOfBirth } = req.body;
    const status = "Accepted";
    console.log("dateOfBirth: ", dateOfBirth);
    // const proof = ZKP(dateOfBirth);
    // const N_transaction=BC(proof);
    res.json({});
  } catch (error) {}
};

const refuseUser = async (req, res) => {
  const session = await User.startSession(); // Used to delete operations on db if file is not deleted
  session.startTransaction();
  try {
    const { email, status } = req.body;
    if (status === "Pending") {
      const newStatus = "Refused";
      const user = await User.findOneAndUpdate(
        { email: email },
        { $set: { status: newStatus } }
      )
        .select("-password")
        .lean();
      deleteFile(`${dir}\\${user.imagePath}`);
      await session.commitTransaction();
      res.json({
        user: user,
        message: "User status has been successfully updated to 'Refused'.",
      });
    } else {
      await session.abortTransaction();
      res.status(400).json({ error: "User is not in Pending state" });
    }
  } catch (error) {
    console.log("Error in refuseUser: ", error);
    await session.abortTransaction();
    res
      .status(500)
      .json({ error: "refuse user error, please try again later." });
  } finally {
    session
      .endSession()
      .catch((err) => console.error("Error ending session: ", err));
  }
};

module.exports = {
  getUsersInfo,
  verifyAdminSession,
  acceptUser,
  refuseUser,
};
