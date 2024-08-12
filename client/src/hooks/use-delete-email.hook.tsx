import toast from "react-hot-toast";
import { userAtom } from "../atoms";
import { useAtomValue } from "jotai";
import axios from "axios";
import { errorHandler } from "../utils";

const useDeleteEmail = () => {
  const user = useAtomValue(userAtom);

  const deleteEmail = async (id: string) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/emails/delete/${id}`,
        {},
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
    deleteEmail,
  };
};

export default useDeleteEmail;
