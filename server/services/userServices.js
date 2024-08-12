const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// register user service
const registerUserService = async (name, emailId, password) => {
  // check if user exists
  const existingUser = await User.findOne({ emailId });

  // throw an error if the user already exists
  if (existingUser) {
    throw new Error("User already exists");
  }
  // generate hashed password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create a new user
  const newUser = new User({
    name,
    emailId,
    password: hashedPassword
  });

  // save new user
  const savedUser = await newUser.save();

  //create a transfer object to send only the necessary information in the response
  const savedUserTO = {
    _id: savedUser._id,
    name,
    emailId,
  }

  // generate a token and assign the user id to the token and set the token to expire in 12 hours
  const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, { expiresIn: "12h" });

  // throw error if token is not generated
  if (!token) {
    throw new Error("Error generating token");
  }

  // return the transfer object and the token
  return {
    savedUserTO,
    token
  }
}

// login user service
const loginUserService = async (emailId, password) => {
  //find user by email
  const user = await User.findOne({ emailId });

  //throw error if user not found
  if (!user) {
    throw new Error("Incorrect credentials");
  }

  //verify password
  const ifValidPass = await bcrypt.compare(password, user.password);
  if (!ifValidPass) {
    throw new Error("Incorrect credentials");
  }

  //create a transfer object to send only the necessary information in the response
  const userTO = {
    _id: user._id,
    name: user.name,
    emailId: user.emailId
  }

  // generate a token and assign the user id to the token and set the token to expire in 12 hours
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "12h" });

  // throw an error if token is not generated
  if (!token) {
    throw new Error("Error generating token");
  }

  // return the transfer object and the token
  return {
    userTO, token
  }
}

// get all users service
const getAllUsersService = async () => {
  // find all the users in the database
  const users = await User.find();

  // throw an error if no users are present
  if (!users) {
    throw new Error("No users found");
  }

  //create a transfer object to send only necessary information in the repsonse
  const usersTO = users.map((user) => {
    return {
      _id: user._id,
      name: user.name,
      emailId: user.emailId
    }
  })

  //return the transfer object
  return usersTO;
}

module.exports = {
  registerUserService,
  loginUserService,
  getAllUsersService
}