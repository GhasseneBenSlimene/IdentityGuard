const User = require("../models/user");
const jwt = require("jsonwebtoken");
const ZKP = require("../ZKP/generate_proof");
const deploy_proof = require("../Blockchain/deploy_proof");
const verify_proof = require("../Blockchain/verify_proof");
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

const acceptUser = async (req, res, next) => {
  let session;
  try {
    const { email, status, dateOfBirth } = req.body;
    console.log("dateOfBirth: ", dateOfBirth);
    const { proof, inputs} =  await ZKP(dateOfBirth);

    console.log(proof);
    const address =  await deploy_proof(proof, inputs);

    const verif = await verify_proof(address);
    console.log(verif);
    console.log(address);
    session = await User.startSession(); // Used to delete operations on db if file is not deleted
    session.startTransaction();
    if (status === "Pending") {
      const newStatus = "Accepted";
      const user = await User.findOne({ email: email })
        .select("email name status imagePath")
        .lean();
      deleteFile(`${dir}\\${user.imagePath}`);
      await User.updateOne(
        { email: email },
        {
          $set: {
            status: newStatus,
            imagePath: "",
          },
        }
      )
        .select("email name status imagePath")
        .lean();
      await session.commitTransaction();
      res.json({
        user: user,
        message: "User status has been successfully updated to 'Accepted'.",
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
      .json({ error: "accepte user error, please try again later." });
  } finally {
    session
      .endSession()
      .catch((err) => console.error("Error ending session: ", err));
  }
};

const refuseUser = async (req, res) => {
  const session = await User.startSession(); // Used to delete operations on db if file is not deleted
  session.startTransaction();
  try {
    const { email, status, refuseReason } = req.body;
    if (status === "Pending") {
      const newStatus = "Refused";
      const user = await User.findOne({ email: email })
        .select("email name status imagePath")
        .lean();
      deleteFile(`${dir}\\${user.imagePath}`);
      await User.updateOne(
        { email: email },
        {
          $set: {
            status: newStatus,
            refuseReason: refuseReason,
            imagePath: "",
          },
        }
      )
        .select("email name status imagePath")
        .lean();
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

// async function findUserAndUpdateState(email, newStatus) {
//   return await User.findOneAndUpdate(
//     { email: email },
//     { $set: { status: newStatus, refuseReason:  } }
//   )
//     .select("email name status imagePath")
//     .lean();
// }

module.exports = {
  getUsersInfo,
  verifyAdminSession,
  acceptUser,
  refuseUser,
};
