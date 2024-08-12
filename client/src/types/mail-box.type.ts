export type MailBoxType = {
  _id?: string;
  from: recipientsType;
  to: recipientsType[];
  cc?: recipientsType[];
  bcc?: recipientsType[];
  subject: string;
  body: string;
  type: string;
  attachment?: string;
  read?: boolean;
  isFavorite: boolean;
  trashed: boolean;
  createdAt: string;
  updatedAt: string;
};
export type CreateMailType = {
  to: string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  body: string;
  type?: string;
  attachment?: string;
};

export type recipientsType = {
  _id: string;
  name: string;
  emailId: string;
};

export type newMailType = {
  _id?: string;
  from: recipientsType;
  to: recipientsType[];
  cc?: recipientsType[];
  bcc?: recipientsType[];
  subject: string;
  body: string;
  type: string;
  attachment?: string;
  read?: boolean;
  isFavorite: boolean;
  trashed: boolean;
  createdAt: string;
  updatedAt: string;
};
