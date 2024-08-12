import { useAtomValue } from "jotai";
import { userAtom } from "../atoms";
import axios from "axios";
import { errorHandler } from "../utils";

const useStarEmail = () => {
  const user = useAtomValue(userAtom);

  const starEmail = async (id: string, status: boolean) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/emails/favorite/${id}`,
        {
          favoriteStatus: status,
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
    starEmail,
  };
};

export default useStarEmail;
