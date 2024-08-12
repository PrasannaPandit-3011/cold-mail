export type UserType = {
  _id: string | null;
  name: string;
  emailId: string | null;
};

export type AuthDataType = null | {
  user: UserType;
  token: string;
};

export type LogInType = {
  emailId: string;
  password: string;
};

export type SignUpType = {
  name: string;
  emailId: string;
  password: string;
  confirmPassword: string;
};
