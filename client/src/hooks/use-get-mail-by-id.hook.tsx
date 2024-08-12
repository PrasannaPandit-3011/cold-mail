import { useState } from "react";
import { MailBoxType } from "../types/mail-box.type";
import { SingleMailResponseDataType } from "../types/data.type";
import axios from "axios";
import { errorHandler } from "../utils";

const useGetMailById = () => {
  const localUser = localStorage.getItem("user");
  const user = localUser && JSON.parse(localUser);
  const [mail, setMail] = useState<MailBoxType>();

  const getEmailById = async (id: string) => {
    try {
      const response = await axios.get<SingleMailResponseDataType["data"]>(
        `${import.meta.env.VITE_BASE_URL}/emails/mail/${id}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      const email = response.data.data;
      setMail(email);
    } catch (error) {
      errorHandler(error);
      throw error;
    }
  };

  return {
    getEmailById,
    mail,
  };
};

export default useGetMailById;
