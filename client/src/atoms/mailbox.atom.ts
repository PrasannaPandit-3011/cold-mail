import { atom } from "jotai";
import { MailBoxType } from "../types/mail-box.type";

export const mailboxAtom = atom<MailBoxType[]>([]);
export const totalAtom = atom<number>(0);
