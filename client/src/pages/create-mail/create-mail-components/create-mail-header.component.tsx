import {
  CloseSharp,
  OpenInFullSharp,
  CloseFullscreenSharp,
} from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import { ButtonHolderStyles, MailHeadingStyles } from "../create-mail-styles";
import { IMailHeaderProps } from "../../../models";

const MailHeader: React.FC<IMailHeaderProps> = ({
  setOpenFullScreen,
  openFullScreen,
  handleClose,
}) => {
  return (
    <>
      <Typography
        variant="h6"
        color="primary.contrastText"
        ml={1}
        sx={MailHeadingStyles}
      >
        New Mail
      </Typography>
      <Box sx={ButtonHolderStyles}>
        {openFullScreen ? (
          <IconButton onClick={() => setOpenFullScreen(!openFullScreen)}>
            <CloseFullscreenSharp />
          </IconButton>
        ) : (
          <IconButton onClick={() => setOpenFullScreen(!openFullScreen)}>
            <OpenInFullSharp />
          </IconButton>
        )}
        <IconButton onClick={handleClose}>
          <CloseSharp />
        </IconButton>
      </Box>
    </>
  );
};

export default MailHeader;
