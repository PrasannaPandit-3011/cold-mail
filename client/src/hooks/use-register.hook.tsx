import { useSetAtom } from "jotai";
import { useState } from "react";
import { userAtom } from "../atoms";
import { useNavigate } from "react-router";
import axios from "axios";
import { SignUpType } from "../types/user.type";
import { Paths } from "../enums/paths.enums";
import { errorHandler } from "../utils";

const useRegister = () => {
  const setUser = useSetAtom(userAtom);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const register = async (data: SignUpType) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        {
          name: data.name,
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
    register,
    loading,
    navigate,
  };
};

export default useRegister;
