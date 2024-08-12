import { useAtomValue } from "jotai";
import { userAtom } from "../atoms";
import axios from "axios";
import toast from "react-hot-toast";
import { errorHandler } from "../utils";

const useDownloadAttachement = () => {
  const user = useAtomValue(userAtom);

  const downloadAttachment = async (id: string, path: string) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/emails/download/${id}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
          responseType: "blob",
        }
      );

      const fileName = path.split("_").slice(-1).join("_").split(".")[0];
      const fileType = response.data.type.split("/")[1];
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${fileName}.${fileType}`);
      document.body.appendChild(link);
      link.click();
      toast.success(response.data.message);
    } catch (error) {
      errorHandler(error);
      throw error;
    }
  };

  return {
    downloadAttachment,
  };
};

export default useDownloadAttachement;
