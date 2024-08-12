import { CreateMailType } from "../types";

export const recipients: Array<{
  name: keyof CreateMailType;
  label: string;
  required: boolean;
}> = [
  {
    name: "to",
    label: "To",
    required: true,
  },
  {
    name: "cc",
    label: "Cc",
    required: false,
  },
  {
    name: "bcc",
    label: "Bcc",
    required: false,
  },
];
