import axios from "axios";
import { MailBoxResponseDataType } from "../types/data.type";
import { useSetAtom } from "jotai";
import { mailboxAtom, totalAtom } from "../atoms";
import { MailBoxType } from "../types";
import { errorHandler } from "../utils";

type GetMailBoxType = (
  type: string,
  limit: number,
  page: number
) => Promise<MailBoxType[]>;

const useGetMailbox = () => {
  const localUser = localStorage.getItem("user");
  const user = localUser && JSON.parse(localUser);
  const setMailbox = useSetAtom(mailboxAtom);
  const setTotal = useSetAtom(totalAtom);

  const getMailBox: GetMailBoxType = async (
    mailBoxType: string,
    limit = 10,
    page = 1
  ) => {
    try {
      const response = await axios.get<MailBoxResponseDataType["data"]>(
        `${
          import.meta.env.VITE_BASE_URL
        }/emails/${mailBoxType}?page=${page}&limit=${limit}`,
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
    getMailBox,
  };
};

export default useGetMailbox;
