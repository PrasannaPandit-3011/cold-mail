import { useCallback, useState } from "react";
import useGetMailbox from "./use-get-mail-box.hook";
import useGetStarredEmails from "./use-get-starred-emails.hook";
import useGetTrashedEmails from "./use-get-trashed-emails.hook";
import { MailBoxType } from "../types";
import toast from "react-hot-toast";
import { Pages } from "../enums";

const useFetchEmails = (mailBoxType: string) => {
  const { getMailBox } = useGetMailbox();
  const { getStarredEmails } = useGetStarredEmails();
  const { getTrashedEmails } = useGetTrashedEmails();
  const [loading, setLoading] = useState<boolean>(false);
  const fetchEmails = useCallback(
    async (page: number, limit: number): Promise<MailBoxType[]> => {
      setLoading(true);
      let emails: MailBoxType[] = [];
      loading && toast.loading("Loading...");
      switch (mailBoxType) {
        case "inbox":
        case "outbox":
          emails = await getMailBox(mailBoxType, limit, page + 1);
          break;
        case Pages.STARRED:
          emails = await getStarredEmails(page + 1, limit);
          break;
        case Pages.TRASHED:
          emails = await getTrashedEmails(page + 1, limit);
          break;
        default:
          break;
      }
      toast.dismiss();
      return emails;
    },
    [mailBoxType, getMailBox, getStarredEmails, getTrashedEmails] //eslint-disable-line
  );

  return { fetchEmails };
};

export default useFetchEmails;
