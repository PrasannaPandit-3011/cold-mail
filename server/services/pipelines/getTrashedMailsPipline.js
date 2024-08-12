const mongoose = require('mongoose');

exports.getTrashedMailsPipeline = (userId, mailboxType) => {
  return [
    // match the user by userId
    { $match: { _id: mongoose.Types.ObjectId(userId) } },

    // unwind the specified mailbox type array
    { $unwind: `$${mailboxType}` },

    // match emails that are not deleted but trashed
    {
      $match: {
        [`${mailboxType}.deleted`]: false,
        [`${mailboxType}.trashed`]: true
      }
    },

    // lookup the email details from the emails collection
    {
      $lookup: {
        from: 'emails',
        localField: `${mailboxType}.email`,
        foreignField: '_id',
        as: 'email'
      }
    },
    { $unwind: "$email" },

    // lookup the sender details from the users collection
    {
      $lookup: {
        from: 'users',
        localField: 'email.from',
        foreignField: '_id',
        as: 'email.from'
      }
    },
    { $unwind: "$email.from" },

    // lookup the recipient details from the users collection
    {
      $lookup: {
        from: 'users',
        localField: 'email.to',
        foreignField: '_id',
        as: 'email.to'
      }
    },

    // lookup the cc details from the users collection
    {
      $lookup: {
        from: 'users',
        localField: 'email.cc',
        foreignField: '_id',
        as: 'email.cc'
      }
    },

    // lookup the bcc details from the users collection
    {
      $lookup: {
        from: 'users',
        localField: 'email.bcc',
        foreignField: '_id',
        as: 'email.bcc'
      }
    },

    // add fields for read, isFavorite, and trashed statuses
    {
      $addFields: {
        'email.read': `$${mailboxType}.read`,
        'email.isFavorite': `$${mailboxType}.isFavorite`,
        'email.trashed': `$${mailboxType}.trashed`,
      }
    },

    // sort the emails by creation date in descending order
    { $sort: { 'email.createdAt': -1 } },

    // project the desired fields
    {
      $project: {
        _id: '$email._id',
        from: { name: '$email.from.name', emailId: '$email.from.emailId' },
        to: {
          $map: {
            input: '$email.to',
            as: 'toUser',
            in: { name: '$$toUser.name', emailId: '$$toUser.emailId' }
          }
        },
        cc: {
          $map: {
            input: '$email.cc',
            as: 'ccUser',
            in: { name: '$$ccUser.name', emailId: '$$ccUser.emailId' }
          }
        },
        bcc: {
          $map: {
            input: '$email.bcc',
            as: 'bccUser',
            in: { name: '$$bccUser.name', emailId: '$$bccUser.emailId' }
          }
        },
        subject: '$email.subject',
        body: '$email.body',
        attachment: '$email.attachment',
        type: '$email.type',
        createdAt: '$email.createdAt',
        updatedAt: '$email.updatedAt',
        read: '$email.read',
        isFavorite: '$email.isFavorite',
        trashed: '$email.trashed',
      }
    },
  ]
}
