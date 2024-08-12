const Email = require("../models/Email");
const User = require("../models/User");
const { getFavoriteMailsPipeline } = require("./pipelines/getFavoriteMailsPipeline");
const { getTrashedMailsPipeline } = require("./pipelines/getTrashedMailsPipline");
const { getUserMailBoxPipeline } = require("./pipelines/getUserMailBoxPipeline");
const mongoose = require("mongoose");

// service for getting an email by id
exports.getEmailByIdService = async (id) => {

  // get email and populate the recipient details
  const email = await Email.findById({ _id: id }).populate([
    { path: "from", select: "_id name emailId" },
    { path: "to", select: "_id name emailId" },
    { path: "cc", select: "_id name emailId" },
    { path: "bcc", select: "_id name emailId" },
  ]);

  // check if email doesn't exist
  if (!email) {
    throw new Error(`No email with id: ${id} found!`)
  }

  // return the found email
  return email;
};

// service for getting user mailbox by its type
exports.getUserMailboxEmailsService = async (userId, mailboxType, page, limit) => {
  // valid mailbox types
  const mailboxTypes = ["inbox", "outbox"];

  // validate inputs
  if (!userId) {
    throw new Error("User id is required");
  }

  if (!mailboxTypes.includes(mailboxType)) {
    throw new Error(`Invalid mailbox type. Allowed types are: ${mailboxTypes.join(", ")}`);
  }

  // aggregation pipeline
  const pipeline = getUserMailBoxPipeline(userId, mailboxType, page, limit);

  // execute aggregation pipeline
  const result = await User.aggregate(pipeline);
  const userEmails = result[0].data;
  const totalCount = result[0].totalCount[0]?.count || 0;

  return { userEmails, totalCount };

}

// service for downloading email attachment
exports.downloadAttachmentService = async (emailId) => {
  const email = await Email.findById(emailId);
  if (!email || !email.attachment) {
    throw new Error("No attachments found in this email");
  }
  return email.attachment;
}

// service for sending an email
exports.sendEmailService = async (userId, data) => {
  // collect details from data
  const sendData = {
    from: userId,
    ...data
  };

  const receivers = [
    ...(Array.isArray(data.to) ? data.to : []),
    ...(Array.isArray(data.cc) ? data.cc : []),
    ...(Array.isArray(data.bcc) ? data.bcc : [])
  ];

  // save email in database
  const email = new Email(sendData);
  const emailCreated = await email.save();
  if (!emailCreated) {
    throw new Error("Error in creating email");
  }

  // update sender's outbox
  await User.findByIdAndUpdate(userId, { $push: { 'outbox': { email: email._id } } });

  // update receivers' inbox
  await User.updateMany({ _id: { $in: receivers } }, { $push: { 'inbox': { email: email._id } } });

  return email;
}

// service for trashing an email
exports.updateTrashStatusService = async (userId, emailId, trashStatus) => {
  // update email where user id is userId, email id is emailId in the specified mailbox
  const trashOutboxMail = await User.findOneAndUpdate(
    {
      _id: new mongoose.Types.ObjectId(userId),
      [`outbox.email`]: new mongoose.Types.ObjectId(emailId),
      [`outbox.deleted`]: false,

    },
    {
      $set: { [`outbox.$.trashed`]: trashStatus }
    }
  );
  const trashInboxMail = await User.findOneAndUpdate(
    {
      _id: new mongoose.Types.ObjectId(userId),
      [`inbox.email`]: new mongoose.Types.ObjectId(emailId),
      [`inbox.deleted`]: false,

    },
    {
      $set: { [`inbox.$.trashed`]: trashStatus }
    }
  )
  if (!trashOutboxMail && !trashInboxMail) {
    throw new Error("Email not trashed");
  }
  return { trashInboxMail, trashOutboxMail };
}

// service for getting trashed emails
exports.getTrashedEmailsService = async (userId, page = 1, limit = 10) => {
  const outboxResult = await User.aggregate(getTrashedMailsPipeline(userId, "outbox"));
  const inboxResult = await User.aggregate(getTrashedMailsPipeline(userId, "inbox"));
  let trashedEmails = [...outboxResult, ...inboxResult];
  const totalCount = trashedEmails.length;
  trashedEmails = trashedEmails.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  }).slice((page - 1) * limit, page * limit);

  return { trashedEmails, totalCount };
}

// service for updating email favorite status
exports.updateFavoriteStatusService = async (userId, emailId, favoriteStatus) => {
  const outBoxMail = await User.findOneAndUpdate(
    {
      _id: new mongoose.Types.ObjectId(userId),
      [`outbox.email`]: new mongoose.Types.ObjectId(emailId),
      [`outbox.deleted`]: false,
    },
    {
      $set: {
        [`outbox.$.isFavorite`]: favoriteStatus
      }
    }
  );
  const inBoxMail = await User.findOneAndUpdate(
    {
      _id: new mongoose.Types.ObjectId(userId),
      [`inbox.email`]: new mongoose.Types.ObjectId(emailId),
      [`inbox.deleted`]: false,
    },
    {
      $set: {
        [`inbox.$.isFavorite`]: favoriteStatus
      }
    }
  );

  if (!outBoxMail && !inBoxMail) {
    throw new Error("Error updating email")
  }
  return {
    outBoxMail,
    inBoxMail
  }
};

// service for getting favorite emails
exports.getFavoritesEmailsService = async (userId, page = 1, limit = 10) => {
  const outboxResult = await User.aggregate(getFavoriteMailsPipeline(userId, "outbox"));
  const inboxResult = await User.aggregate(getFavoriteMailsPipeline(userId, "inbox"));
  let favoriteEmails = [...outboxResult, ...inboxResult];
  const totalCount = favoriteEmails.length;
  favoriteEmails = favoriteEmails.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  }).slice((page - 1) * limit, page * limit);

  return { favoriteEmails, totalCount };
}

// service for updating email read status
exports.updateEmailReadStatusService = async (userId, emailId, readStatus) => {
  const updateReadStatus = await User.findOneAndUpdate(
    {
      _id: new mongoose.Types.ObjectId(userId),
      [`inbox.email`]: new mongoose.Types.ObjectId(emailId),
      [`inbox.deleted`]: false,
    },
    {
      $set: {
        [`inbox.$.read`]: readStatus
      }
    }
  );

  if (!updateReadStatus) {
    throw new Error("Error updating email")
  }

  return updateReadStatus
};

// service for deleting an email
exports.deleteEmailService = async (userId, emailId) => {
  const deleteFromInbox = await User.findOneAndUpdate(
    {
      _id: new mongoose.Types.ObjectId(userId),
      ["inbox.email"]: new mongoose.Types.ObjectId(emailId),
    },
    {
      $set: {
        ["inbox.$.deleted"]: true
      }
    }
  );

  const deleteFromOutbox = await User.findOneAndUpdate(
    {
      _id: new mongoose.Types.ObjectId(userId),
      ["outbox.email"]: new mongoose.Types.ObjectId(emailId),
    }, {
    $set: {
      ["outbox.$.deleted"]: true
    }
  })
  if (!deleteFromInbox && !deleteFromOutbox) {
    throw new Error("Error updating email");
  }
  return {
    deleteFromOutbox,
    deleteFromInbox,

  };
}
