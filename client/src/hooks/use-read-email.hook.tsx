import { useAtomValue } from "jotai";
import { userAtom } from "../atoms";
import axios from "axios";
import { errorHandler } from "../utils";

const useReadEmail = () => {
  const user = useAtomValue(userAtom);

  const readEmail = async (id: string, status: boolean) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/emails/read/${id}`,
        {
          readStatus: status,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
    } catch (error) {
      errorHandler(error);
      throw error;
    }
  };

  return {
    readEmail,
  };
};

export default useReadEmail;
