import { userAtom } from "../atoms";
import { useAtomValue } from "jotai";
import axios from "axios";
import { errorHandler } from "../utils";

const useTrashEmail = () => {
  const user = useAtomValue(userAtom);
  const trashEmail = async (id: string, trashStatus: boolean) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/emails/trash/${id}`,
        {
          trashStatus,
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
    trashEmail,
  };
};

export default useTrashEmail;
