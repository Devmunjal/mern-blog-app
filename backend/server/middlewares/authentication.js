const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { isTokenIncluded, getAccessTokenFromHeader } = require("../utils/helper/token");
const User = require("../models/users");

const passphrase = "blog-application";
const publicKey = "";
const privateKey = "";

const generateJWT = (user) => {
  const { uuid } = user;
  const jwtObject = { uuid };

  return jwt.sign(jwtObject, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const authenticateUser = async (req, res, next) => {
  if (!isTokenIncluded(req)) {
    return res.status(401).send("You are not authorized to access this route ")
  }
  const accessToken = getAccessTokenFromHeader(req);
  const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
  const user = await User.findOne({uuid: decoded.uuid});
  if (!user) {
    return res.status(401).send("You are not authorized to access this route.")
  }
  req.user = user;
  next();
};

const encryptString = async (string) => {
  const buffer = new Buffer.from(string);
  const encrypted = crypto.publicEncrypt(publicKey, buffer);
  return encrypted.toString("base64");
};

const decryptString = async (encodedString) => {
  try {
    const buffer = new Buffer.from(encodedString, "base64");
    const decrypted = crypto.privateDecrypt(
      {
        key: privateKey.toString(),
        passphrase: passphrase,
      },
      buffer
    );
    return { success: true, decrypted: decrypted.toString("utf8") };
  } catch (e) {
    return { success: false };
  }
};

module.exports = {
  generateJWT,
  decryptString,
  encryptString,
  authenticateUser,
};
