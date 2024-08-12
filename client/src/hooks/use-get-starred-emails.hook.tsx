import axios from "axios";

import { useSetAtom } from "jotai";
import { mailboxAtom, totalAtom } from "../atoms";
import { MailBoxResponseDataType } from "../types/data.type";
import { MailBoxType } from "../types";
import { errorHandler } from "../utils";

export type GetFlaggedMailsType = (
  page: number,
  limit: number
) => Promise<MailBoxType[]>;

const useGetStarredEmails = () => {
  const localUser = localStorage.getItem("user");
  const user = localUser && JSON.parse(localUser);
  const setMailbox = useSetAtom(mailboxAtom);
  const setTotal = useSetAtom(totalAtom);

  const getStarredEmails: GetFlaggedMailsType = async (
    page = 1,
    limit = 10
  ) => {
    try {
      const response = await axios.get<MailBoxResponseDataType["data"]>(
        `${
          import.meta.env.VITE_BASE_URL
        }/emails/favorite/mails?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      const emails = response.data.data;
      setMailbox(emails);
      setTotal(response.data.totalCount);

      return emails;
    } catch (error) {
      errorHandler(error);
      throw error;
    }
  };

  return {
    getStarredEmails,
  };
};

export default useGetStarredEmails;
