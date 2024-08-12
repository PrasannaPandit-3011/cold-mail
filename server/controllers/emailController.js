const { StatusCodes } = require("http-status-codes");
const { getEmailByIdService, sendEmailService, getUserMailboxEmailsService, getTrashedEmailsService, markEmailAsFavoriteService, updateTrashStatusService, updateFavoriteStatusService, getFavoritesEmailsService, updateEmailReadStatusService, deleteEmailService, downloadAttachmentService, } = require("../services/emailServices");
const { validateEmail } = require("../validators/emailValidator");
const fs = require("fs");

// controller for getting an email by id
exports.getEmailById = async (req, res) => {
  //take email id from req.params
  const { emailId } = req.params;

  //call get email by id service
  const email = await getEmailByIdService(emailId);

  //return the found email
  res.status(StatusCodes.OK).json({
    message: "Email found",
    data: email,
    status: StatusCodes.OK
  })
}

// controller for getting all the mails by the mailboxtype
exports.getEmailsByMailbox = async (req, res) => {
  // extracting the data from the request query for pagination
  const { page = 1, limit = 10 } = req.query;

  // extracting the mail box type from the request params
  const { mailBoxType } = req.params;

  // calling the service for getting all the mails
  const { userEmails, totalCount } = await getUserMailboxEmailsService(req.user.id, mailBoxType, page, limit);

  // check if userEmails is not found
  if (!userEmails) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: `No ${mailBoxType} emails found`,
      status: StatusCodes.NOT_FOUND
    });
  }

  // return the found emails with status code 200
  return res.status(200).json({
    message: `Emails in ${mailBoxType} found`,
    data: userEmails,
    totalCount,
    status: StatusCodes.OK
  });
}

// controller for getting trashed emails
exports.getTrashedEmail = async (req, res) => {
  // extracting the data from the request query for pagination
  const { page = 1, limit = 10 } = req.query;

  // using the getTrashedEmailsServices to get all the trashed emails
  const { trashedEmails, totalCount } = await getTrashedEmailsService(req.user.id, page, limit);

  // if no emails are present, returning a prompt response
  if (!trashedEmails) {
    res.status(StatusCodes.NOT_FOUND).json({
      message: "No trashed mails found",
      status: StatusCodes.NOT_FOUND
    })
  }
  // returning the trashed emails allong with the success response
  return res.status(200).json({
    message: "Trashed email fetched",
    data: trashedEmails,
    totalCount,
    status: StatusCodes.OK
  });

}

// controller for getting emails marked as favorite
exports.getFavoritesEmails = async (req, res) => {
  // extracting the data from the request query for pagination
  const { page = 1, limit = 10 } = req.query;

  // calling the get favorite emails service
  const { favoriteEmails, totalCount } = await getFavoritesEmailsService(req.user.id, page, limit);

  // if no emails are present, returning a prompt response
  if (!favoriteEmails) {
    res.status(StatusCodes.NOT_FOUND).json({
      message: "No favorites found",
      status: StatusCodes.NOT_FOUND
    })
  }

  // returning the favorite emails along with the success response
  res.status(StatusCodes.OK).json({
    message: "Favorites emails fetched",
    data: favoriteEmails,
    totalCount,
    status: StatusCodes.OK
  })
}

// controller for marking an email as read
exports.sendEmail = async (req, res) => {

  // validate the email data
  const { error } = validateEmail(req.body);

  // return error response if body is invalid
  if (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: error.details[0].message,
      status: StatusCodes.BAD_REQUEST
    });
  };

  // call the service to send the email
  await sendEmailService(req.user.id, req.body);

  // return success response if email is sent successfully
  res.status(StatusCodes.CREATED).json({
    message: "Email sent successfully",
    status: StatusCodes.CREATED
  })
}

// controller for uploading a file
exports.uploadAttachment = async (req, res) => {

  // returns the file path and a success response
  res.status(StatusCodes.OK).json({
    success: true,
    data: `uploads/${req.file.filename}`,
    message: "File uploaded successfully",
  });
}

// controller for downloading attachment
exports.downloadAttachment = async (req, res) => {
  // getting the id of the email containing the attachment
  const { id } = req.params;

  // call the service to get the file path
  const filePath = await downloadAttachmentService(id);

  // check if the file exists
  if (!fs.existsSync(filePath)) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: "File not found on server",
      status: StatusCodes.NOT_FOUND
    });
  }

  // send the file to the client for download using res.download() method
  res.download(filePath, (err) => {
    if (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Error downloading the file",
        status: StatusCodes.INTERNAL_SERVER_ERROR
      });
    }
  });
}

// controller for the updation of email trash status
exports.updateTrashStatus = async (req, res) => {
  // get the id of the email to update it's trash status
  const { id } = req.params;

  // get the trash status to update
  const { trashStatus } = req.body;

  // call the update email trash status service
  const { trashInboxMail, trashOutboxMail } = await updateTrashStatusService(req.user.id, id, trashStatus);

  // check if the email was found in either inbox or outbox
  if (!trashInboxMail && !trashOutboxMail) {
    throw new Error("Error updating trash status");
  }

  // return a success response
  res.status(StatusCodes.OK).json({
    message: "Trash status updated successfully",
    status: StatusCodes.OK
  })
}

// controller to update the favorite status of an email
exports.updateEmailFavoriteStatus = async (req, res) => {
  // get the id of the email to update it's favorite status
  const { id } = req.params;

  // get the favorite status to update
  const { favoriteStatus } = req.body;

  // call the update favorite status service
  const { outBoxMail, inBoxMail } = await updateFavoriteStatusService(req.user.id, id, favoriteStatus);

  // check if the email was found in either inbox or outbox
  if (!outBoxMail && !inBoxMail) {
    throw new Error("Error changing favorite status");
  }

  // return a success response
  res.status(StatusCodes.OK).json({
    message: 'Marked email as favorite',
    status: StatusCodes.OK
  })
}

// controller for updating read status
exports.updateEmailReadStatus = async (req, res) => {
  // get the id of the email to update it's read status
  const { id } = req.params;

  // get the read status to update
  const { readStatus } = req.body;

  // call the service to update the read status
  const read = await updateEmailReadStatusService(req.user.id, id, readStatus);

  // check if the email was found in either inbox or outbox
  if (!read) throw new Error("Error in updating read status")

  // return a success response
  res.status(StatusCodes.OK).json({
    message: "Read status updated successfully",
    status: StatusCodes.OK
  })
}

// controller for deleting an email
exports.deleteEmail = async (req, res) => {
  // extract the email id from the request parameters
  const { id } = req.params;

  // call the deleteEmailService to delete the email
  const deleted = await deleteEmailService(req.user.id, id);

  // check if the email was deleted
  if (!deleted) throw new Error("Email not deleted");

  // return a success response
  res.status(StatusCodes.OK).json({
    message: "Email deleted successfully",
    status: StatusCodes.OK
  })
}