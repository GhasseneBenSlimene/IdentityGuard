const User = require("../models/user");
const jwt = require("jsonwebtoken");

const getUsersInfo = async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    const user = jwt.verify(token, process.env.JWT_SECRET, {});
    if (user.admin) {
      const users = await User.find(
        { status: "Pending" },
        { email: 1, imagePath: 1, _id: 0 }
      ).lean();
      return res.json(users);
    }
  } else return res.json(null);
};

const verifyAdminSession = (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const user = jwt.verify(token, process.env.JWT_SECRET, {});
    if (user.admin) {
      next();
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  } else res.status(401).json({ error: "Unauthorized" });
};

const acceptUser = (req, res, next) => {
  const { email, age } = req.body;
  // const proof = ZKP(age);
  // const N_transaction=BC(proof);
};

module.exports = {
  getUsersInfo,
  verifyAdminSession,
  acceptUser,
};
