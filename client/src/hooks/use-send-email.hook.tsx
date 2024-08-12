import { useAtomValue } from "jotai";
import { userAtom } from "../atoms";
import axios from "axios";
import { CreateMailType } from "../types/mail-box.type";
import toast from "react-hot-toast";
import { errorHandler } from "../utils";

const useSendEmail = () => {
  const user = useAtomValue(userAtom);

  const sendEmail = async (body: CreateMailType) => {
    try {
      if (body.subject.trim() === "") {
        body.subject = "<No Subject>";
      }
      if (body.body.trim() === "") {
        body.body = "&lt;No Body&gt;";
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/emails/sendEmail`,
        {
          to: body.to,
          cc: body.cc,
          bcc: body.bcc,
          subject: body.subject,
          body: body.body,
          attachment: body.attachment,
          type: body.type,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      toast.success(response.data.message);
    } catch (error) {
      errorHandler(error);
      throw error;
    }
  };

  return {
    sendEmail,
  };
};

export default useSendEmail;
