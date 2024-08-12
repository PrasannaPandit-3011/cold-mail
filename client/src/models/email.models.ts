import { MailBoxType } from "../types";

export interface IEmailProps {
  mail: MailBoxType;
}

export interface IMailBoxTableProp {
  mailBoxType: string;
}

export interface IActionProps extends IEmailProps, IMailBoxTableProp {}
