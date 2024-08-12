import axios from "axios";
import { useSetAtom } from "jotai";
import { mailboxAtom, totalAtom } from "../atoms";
import { MailBoxResponseDataType } from "../types/data.type";
import { GetFlaggedMailsType } from "./use-get-starred-emails.hook";
import { errorHandler } from "../utils";

const useGetTrashedEmails = () => {
  const localUser = localStorage.getItem("user");
  const user = localUser && JSON.parse(localUser);
  const setTrashedMails = useSetAtom(mailboxAtom);
  const setTotal = useSetAtom(totalAtom);

  const getTrashedEmails: GetFlaggedMailsType = async (
    page = 1,
    limit = 10
  ) => {
    try {
      const response = await axios.get<MailBoxResponseDataType["data"]>(
        `${
          import.meta.env.VITE_BASE_URL
        }/emails/trash/mails?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      const emails = response.data.data;
      setTrashedMails(emails);
      setTotal(response.data.totalCount);
      return emails;
    } catch (error) {
      errorHandler(error);
      throw error;
    }
  };

  return {
    getTrashedEmails,
  };
};

export default useGetTrashedEmails;
