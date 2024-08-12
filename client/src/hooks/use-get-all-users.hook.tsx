import { useState } from "react";
import { UserType } from "../types/user.type";
import axios from "axios";
import { errorHandler } from "../utils";

const useGetAllUsers = () => {
  const [users, setUsers] = useState<UserType[]>([
    {
      _id: "",
      name: "",
      emailId: "",
    },
  ]);
  const [loading, setLoading] = useState<boolean>(false);

  const getAllUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/users/getAllUsers`
      );
      setUsers(response.data.data);
    } catch (error) {
      errorHandler(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    getAllUsers,
    users,
    loading,
  };
};

export default useGetAllUsers;
