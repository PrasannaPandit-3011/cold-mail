import { MailBoxType } from "./mail-box.type";

//Data type for Data retriving
export type MailBoxResponseDataType = {
  config: unknown;
  data: {
    data: MailBoxType[];
    totalCount: number;
    message: string;
    status: number;
  };
  headers: unknown;
  request: unknown;
  status: number;
  statusText: string;
};
export type SingleMailResponseDataType = {
  config: unknown;
  data: {
    data: MailBoxType;
    message: string;
    status: number;
  };
  headers: unknown;
  request: unknown;
  status: number;
  statusText: string;
};

export type MutationDataType = {
  config: unknown;
  data: {
    message: string;
    status: number;
  };
  headers: unknown;
  request: unknown;
  status: number;
  statusText: string;
};

export type AuthResponseDataType = {
  config: unknown;
  data: {
    message: string;
    data: {
      user: {
        _id: string;
        name: string;
        email: string;
      };
      token: string;
    };
    status: number;
  };
  headers: unknown;
  request: unknown;
  status: number;
  statusText: string;
};
