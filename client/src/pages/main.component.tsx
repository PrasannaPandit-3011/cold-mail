import { Outlet, useNavigate } from "react-router";
import { Box } from "@mui/material";
import Sidebar from "./common/common-components/sidebar.component";
import { Paths } from "../enums/paths.enums";
import { useEffect } from "react";
import { MainBoxStyles, OutletBoxStyles } from "../styles";

const Main = () => {
  const localUser = localStorage.getItem("user");
  const navigate = useNavigate();

  useEffect(() => {
    if (localUser === null) {
      navigate(Paths.AUTH);
    }
  }, [localUser, navigate]);

  return (
    <Box sx={MainBoxStyles}>
      <Sidebar />
      <Box sx={OutletBoxStyles}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Main;
