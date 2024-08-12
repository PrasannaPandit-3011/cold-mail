const express = require("express");
const { verifyToken } = require("../middleware/auth");
const { uploadAttachment, sendEmail, getEmailsByMailbox, getEmailById, getTrashedEmail, updateTrashStatus, updateEmailReadStatus, deleteEmail, getFavoritesEmails, updateEmailFavoriteStatus, downloadAttachment, } = require("../controllers/emailController");
const upload = require("../middleware/multer");

// initialise email router
const emailRouter = express.Router();

// apply the verify token middle to all the routes in the emailRouter
emailRouter.use(verifyToken);

// route for getting an email by its id
emailRouter.get("/mail/:emailId", getEmailById);

// route for getting an user's mailbox based on the mailBox type
emailRouter.get("/:mailBoxType", getEmailsByMailbox);

// route for sending an email
emailRouter.post("/sendEmail", sendEmail);

// route for uploading a file using the multer middleware
emailRouter.post("/upload", upload.single("attachment"), uploadAttachment);

// route for downloading a file from the server
emailRouter.get("/download/:id", downloadAttachment);

// route for trashing an email
emailRouter.patch("/trash/:id", updateTrashStatus);

// route for getting all the trashed emails
emailRouter.get("/trash/mails", getTrashedEmail);

// route for marking an email as favorite
emailRouter.patch("/favorite/:id", updateEmailFavoriteStatus);

// route for getting all the favorite emails
emailRouter.get("/favorite/mails", getFavoritesEmails);

// route for updating the read status of an email
emailRouter.patch("/read/:id", updateEmailReadStatus);

// route for (soft) deleting an email
emailRouter.patch("/delete/:id", deleteEmail);

module.exports = emailRouter;