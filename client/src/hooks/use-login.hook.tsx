import { useSetAtom } from "jotai";
import { useState } from "react";
import { userAtom } from "../atoms";
import axios from "axios";
import { useNavigate } from "react-router";
import { Paths } from "../enums/paths.enums";
import { LogInType } from "../types/user.type";
import { errorHandler } from "../utils";

const useLogin = () => {
  const setUser = useSetAtom(userAtom);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (data: LogInType) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        {
          emailId: data.emailId,
          password: data.password,
        }
      );
      setUser({
        user: {
          _id: response.data.data.user._id,
          name: response.data.data.user.name,
          emailId: response.data.data.user.emailId,
        },
        token: response.data.data.token,
      });
      navigate(Paths.INBOX);
    } catch (error) {
      errorHandler(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
  };
};

export default useLogin;
