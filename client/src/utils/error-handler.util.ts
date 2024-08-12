import { AxiosError } from "axios";
import toast from "react-hot-toast";

interface ErrorResponse {
  success: boolean;
  message: string;
}

export const errorHandler = (error: unknown) => {
  const axiosError = error as AxiosError<ErrorResponse>;
  console.log(axiosError);
  if (
    (axiosError.response &&
      axiosError.response.data.message === "invalid signature") ||
    axiosError.response?.data.message === "jwt malformed" ||
    axiosError.response?.data.message === "jwt expired" ||
    axiosError.response?.data.message === "Unauthorized"
  ) {
    localStorage.removeItem("user");
  }
  toast.error(axiosError.response?.data.message ?? "");
  console.log(axiosError);
};
