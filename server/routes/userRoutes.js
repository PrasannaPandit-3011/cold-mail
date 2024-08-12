const express = require("express")
const { registerUser, loginUser, getAllUsersController } = require("../controllers/userController");
const { verifyToken } = require("../middleware/auth");

// initialize the user router
const userRouter = express.Router();

// user route for registering/sign up
userRouter.post("/register", registerUser);

// user route for logging in
userRouter.post("/login", loginUser);

// user route for getting all the users in the database
userRouter.get("/getAllUsers", getAllUsersController)

module.exports = userRouter;