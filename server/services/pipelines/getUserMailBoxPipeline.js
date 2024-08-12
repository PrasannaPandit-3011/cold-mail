const mongoose = require("mongoose");

exports.getUserMailBoxPipeline = (userId, mailboxType, page, limit) => {
  return [
    { $match: { _id: mongoose.Types.ObjectId(userId) } },
    { $unwind: `$${mailboxType}` },
    // Match conditions to filter out deleted or trashed emails
    {
      $match: {
        [`${mailboxType}.deleted`]: false,
        [`${mailboxType}.trashed`]: false
      }
    },
    // Lookup to populate email details
    {
      $lookup: {
        from: 'emails',
        localField: `${mailboxType}.email`,
        foreignField: '_id',
        as: 'email'
      }
    },
    // Unwind the email array
    { $unwind: '$email' },
    // Lookup to populate 'from' field with user details
    {
      $lookup: {
        from: 'users',
        localField: 'email.from',
        foreignField: '_id',
        as: 'email.from'
      }
    },
    { $unwind: "$email.from" },
    // Lookup to populate 'to' field with user details
    {
      $lookup: {
        from: 'users',
        localField: 'email.to',
        foreignField: '_id',
        as: 'email.to'
      }
    },
    // Lookup to populate 'cc' field with user details
    {
      $lookup: {
        from: 'users',
        localField: 'email.cc',
        foreignField: '_id',
        as: 'email.cc'
      }
    },
    // Lookup to populate 'bcc' field with user details
    {
      $lookup: {
        from: 'users',
        localField: 'email.bcc',
        foreignField: '_id',
        as: 'email.bcc'
      }
    },
    // Add fields from the mailbox (like read, isFavorite, etc.) to the email object
    {
      $addFields: {
        'email.read': `$${mailboxType}.read`,
        'email.isFavorite': `$${mailboxType}.isFavorite`,
        'email.trashed': `$${mailboxType}.trashed`,
      }
    },
    // Sorting by createdAt
    { $sort: { 'email.createdAt': -1 } },
    // Project the final structure of the email object
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
    {
      $facet: {
        data: [
          { $skip: (parseInt(page) - 1) * parseInt(limit) },
          { $limit: parseInt(limit) }
        ],
        totalCount: [
          { $count: "count" }
        ]
      }
    }
  ];
}
