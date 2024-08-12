import { createTheme } from "@mui/material";

export const appTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#0e0e0e",
      dark: "#000",
      light: "#8de4ea",
      contrastText: "#edeef1",
    },
    warning: {
      main: "#A85140",
    },
  },
  components: {
    MuiTablePagination: {
      styleOverrides: {
        select: {
          "&:focus": {
            backgroundColor: "transparent",
          },
        },
        selectIcon: {
          color: "#8de4ea",
        },
        displayedRows: {
          color: "#8de4ea",
        },
        toolbar: {
          color: "#8de4ea",
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            color: "#8de4ea",
          },
        },
      },
    },
  },
});
