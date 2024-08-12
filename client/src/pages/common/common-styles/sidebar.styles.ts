import { MenuOptionType } from "../../../utils";

const drawerWidth = 301;

export const DrawerMainStyle = {
  width: drawerWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    boxSizing: "border-box",
    backgroundColor: "primary.dark",
  },
};

export const DrawerToolBarStyle = {
  mt: 1,
  p: 1,
};

export const DrawerAppLogoStyle = {
  height: 1,
  width: 1,
  ":hover": {
    cursor: "pointer",
  },
  ml: 1,
};

export const DrawerListItemStyle = (
  pathname: string,
  button: MenuOptionType
) => {
  return {
    display: "block",
    backgroundColor:
      pathname === button.path ? "primary.light" : "primary.dark",
    borderRadius: 50,
    color: pathname === button.path ? "primary.dark" : "primary.light",
  };
};

export const DrawerListItemButtonStyle = {
  minHeight: 50,
  justifyContent: "center",
  borderRadius: 50,
  px: 2.5,
};

export const DrawerListItemIconStyle = (
  pathname: string,
  button: MenuOptionType
) => {
  return {
    minWidth: 0,
    mr: 2,
    justifyContent: "center",
    color: pathname === button.path ? "primary.dark" : "primary.light",
  };
};

export const DrawerUserInfoBoxStyle = {
  mt: "auto",
  display: "flex",
  backgroundColor: "primary.main",
  py: 2,
};

export const DrawerUserNameEmailBoxStyle = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
};

export const DrawerUserNameEmailTypographyStyle = {
  mt: 1,
  ml: 1,
  fontFamily: "montserrat",
};

export const DrawerUserAvatarStyle = {
  width: 48,
  height: 48,
  color: "primary.dark",
  backgroundColor: "primary.light",
};

export const ComposeIconStyle = {};

export const ComposeButtonStyle = {
  my: 2,
  mx: "auto",
  width: 0.7,
  p: 2,
  borderRadius: 25,
  backgroundColor: "primary.light",
  color: "primary.dark",
  "&:hover": {
    backgroundColor: "primary.main",
    color: "primary.light",
  },
};

export const ComposeButtonFontStyle = {
  fontFamily: "montserrat",
};

export const ListItemInfoStyle = {
  ml: 1,
  width: 0.9,
  fontFamily: "montserrat",
};
