import { Control, UseFormHandleSubmit } from "react-hook-form";
import { CreateMailType } from "../types";
import { MailPriorityEnum } from "../enums/priority.enums";

export interface ICreateMailProps {
  openCompose: boolean;
  setOpenCompose: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IMailHeaderProps {
  setOpenFullScreen: React.Dispatch<React.SetStateAction<boolean>>;
  openFullScreen: boolean;
  handleClose: () => void;
}

export interface IMailButtonProps {
  handleSubmit: UseFormHandleSubmit<CreateMailType, undefined>;
  onSubmit: (data: CreateMailType) => void;
  uploadFile: (file: File) => Promise<void>;
  handleClose: () => void;
  attachmentName: string | null;
  setPriority: React.Dispatch<React.SetStateAction<MailPriorityEnum>>;
  openFullScreen: boolean;
}

export interface IMailBodyProps {
  control: Control<CreateMailType, unknown>;
  openFullScreen: boolean;
}
