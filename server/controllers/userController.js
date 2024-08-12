const { validateRegister, validateLogin } = require("../validators/userValidator");
const { StatusCodes } = require("http-status-codes");
const { registerUserService, loginUserService, getAllUsersService } = require("../services/userServices");

require("dotenv").config();

// controller for registering user
const registerUser = async (req, res) => {
  // validate req body
  const { error } = validateRegister(req.body);
  // throw an error if body is invalid
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
      status: StatusCodes.NOT_ACCEPTABLE
    })
  }

  // extract data from request body
  const { name, emailId, password } = req.body;

  // register the user using the regiter service
  const { token, savedUserTO } = await registerUserService(name, emailId, password);

  // return success response with token and saved user data
  res.json({
    message: "User Registered Successfully",
    status: StatusCodes.CREATED,
    data: {
      token,
      user: savedUserTO
    }
  })
}

// controller for logging user in
const loginUser = async (req, res, next) => {
  // validate request body
  const { error } = validateLogin(req.body);

  // throw an error if body is invalid
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
      status: StatusCodes.NOT_ACCEPTABLE
    })
  }

  // extract data from request body
  const { emailId, password } = req.body;

  // login the user using the login service
  const { userTO, token } = await loginUserService(emailId, password);

  // return success response with token and logged in user data
  res.json({
    message: "Logged in successfully",
    data: {
      user: userTO,
      token,
    },
    status: StatusCodes.ACCEPTED
  })
}

// controller for getting all the user's data
const getAllUsersController = async (req, res) => {
  // get all users using the getAllUsers service
  const users = await getAllUsersService();

  // return success response with fetched users data
  res.json({
    message: "Users fetched successfully",
    data: users,
    status: StatusCodes.OK
  })
}


module.exports = {
  registerUser,
  loginUser,
  getAllUsersController
}