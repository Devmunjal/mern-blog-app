const asyncHandler = require("express-async-handler");
const User = require("../../models/users");
const { v4: uuidv4 } = require("uuid");
const { generateJWT } = require("../../middlewares/authentication");
const { comparePassword } = require("../../utils/helper/inputValidate");

const register = asyncHandler(async (req, res) => {
  const { userName, email, password, confirmPassword } = req.body;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if(password != confirmPassword) {
    return res.status(500).send("Please enter same password")
  }
  if(!email || !emailRegex.test(email)) {
    return res.status(500).send('Please enter email')
  }
  if(!userName){
    return res.status(500).send('Please enter userName')
  }

  const uuid = uuidv4();

  const existedUser = await User.findOne({ email: email });
  if (existedUser) {
    return res.status(500).send({
      success: true,
      message: "You are already register. Please login",
      data: "You are already register. Please login",
    });
  }

  const user = await User.create({
    userName,
    email,
    password,
    uuid,
  });

  const token = generateJWT(user);

  res.status(200).send({
    success: true,
    message: "User created successfully",
    data: {
      token: token,
      user: user,
    },
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(404).send("Please register your self.");
  }

  if (!comparePassword(password, user.password)) {
    return res.status(401).send("Please check your credentails");
  }

  const token = generateJWT(user);

  res.status(200).send({
    success: true,
    message: "User login successfully",
    data: {
      token: token,
      user: user,
    },
  });
});

module.exports = {
  register,
  login,
};
