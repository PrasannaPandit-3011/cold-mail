import { useState } from "react";
import {
  Box,
  List,
  CssBaseline,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Avatar,
  Toolbar,
  Typography,
  Tooltip,
  Menu,
  MenuItem,
  IconButton,
  Button,
} from "@mui/material";
import Drawer from "@mui/material/Drawer";
import { useNavigate } from "react-router";
import { useAtomValue } from "jotai";
import { Paths } from "../../../enums/paths.enums";
import { FullLogo } from "../../../assets";
import { menuButtons, MenuOptionType } from "../../../utils";
import CreateIcon from "@mui/icons-material/CreateSharp";
import {
  ComposeButtonFontStyle,
  ComposeButtonStyle,
  ComposeIconStyle,
  DrawerAppLogoStyle,
  DrawerListItemButtonStyle,
  DrawerListItemIconStyle,
  DrawerListItemStyle,
  DrawerMainStyle,
  DrawerToolBarStyle,
  DrawerUserAvatarStyle,
  DrawerUserInfoBoxStyle,
  DrawerUserNameEmailBoxStyle,
  DrawerUserNameEmailTypographyStyle,
  ListItemInfoStyle,
} from "../common-styles";
import CreateMail from "../../create-mail/create-mail.page";
import { userAtom } from "../../../atoms";

const Sidebar = () => {
  const { pathname } = window.location;
  const navigate = useNavigate();
  const user = useAtomValue(userAtom);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openCompose, setOpenCompose] = useState<boolean>(false);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    localStorage.removeItem("user");
    navigate(Paths.AUTH);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const userEmail =
    user?.user?.emailId && user.user.emailId.length > 35
      ? `${user.user.emailId.substring(0, 35)}...`
      : user?.user?.emailId;

  const userInitials = user?.user?.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer sx={DrawerMainStyle} variant="permanent" anchor="left">
        <Toolbar sx={DrawerToolBarStyle}>
          <Avatar
            src={FullLogo}
            variant="square"
            onClick={() => navigate(Paths.MAIN)}
            sx={DrawerAppLogoStyle}
          />
        </Toolbar>
        <Divider />
        <Button
          variant="contained"
          startIcon={<CreateIcon sx={ComposeIconStyle} />}
          sx={ComposeButtonStyle}
          onClick={() => setOpenCompose(!openCompose)}
        >
          <Typography variant="body1" sx={ComposeButtonFontStyle}>
            Compose
          </Typography>
        </Button>
        <List>
          {menuButtons.map((button: MenuOptionType) => (
            <ListItem
              key={button.title}
              onClick={() => navigate(button.path)}
              sx={DrawerListItemStyle(pathname, button)}
            >
              <ListItemButton sx={DrawerListItemButtonStyle}>
                <ListItemIcon sx={DrawerListItemIconStyle(pathname, button)}>
                  {button.icon}
                </ListItemIcon>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={ListItemInfoStyle}
                >
                  {button.title}
                </Typography>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Box sx={DrawerUserInfoBoxStyle}>
          <Box sx={DrawerUserNameEmailBoxStyle}>
            <Typography
              variant="body2"
              fontWeight="bold"
              sx={DrawerUserNameEmailTypographyStyle}
            >
              {user?.user.name}
            </Typography>
            <Tooltip title={user?.user?.emailId} arrow>
              <Typography
                variant="caption"
                fontWeight="bold"
                sx={DrawerUserNameEmailTypographyStyle}
              >
                {userEmail}
              </Typography>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            transformOrigin={{ horizontal: "left", vertical: "top" }}
            anchorOrigin={{ horizontal: "left", vertical: "top" }}
            sx={{
              position: "absolute",
              top: -30,
              left: 45,
            }}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
          <IconButton onClick={handleClick} sx={{ mr: 1 }} size="medium">
            <Avatar sx={DrawerUserAvatarStyle}>{userInitials}</Avatar>
          </IconButton>
        </Box>
      </Drawer>
      <CreateMail openCompose={openCompose} setOpenCompose={setOpenCompose} />
    </Box>
  );
};

export default Sidebar;
