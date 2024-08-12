import { useAtomValue } from "jotai";
import { useState } from "react";
import { userAtom } from "../atoms";
import axios from "axios";
import toast from "react-hot-toast";
import { errorHandler } from "../utils";

const useUploadFile = () => {
  const user = useAtomValue(userAtom);
  const [path, setPath] = useState<string>("");

  const uploadFile = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("attachment", file);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/emails/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      setPath(response.data.data);
      toast.success(response.data.message);
    } catch (error) {
      errorHandler(error);
      throw error;
    }
  };

  return {
    uploadFile,
    path,
  };
};

export default useUploadFile;
