import {
  Avatar,
  Box,
  Typography,
  IconButton,
  Paper,
  ClickAwayListener,
  Divider,
  Tooltip,
} from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";
import formatDate from "../../../utils/format-date.util"; // Import the formatDate utility
import { useState } from "react";
import { IEmailProps } from "../../../models/email.models";
import {
  EmailAllInfoStyle,
  EmailAvatarContainerStyle,
  EmailAvatarStyle,
  EmailDateStyle,
  EmailFromToInfoStyle,
  EmailInfoContainerStyle,
} from "../email-styles";

const EmailInfo: React.FC<IEmailProps> = ({ mail }) => {
  const localUser = localStorage.getItem("user");
  const user = localUser && JSON.parse(localUser);

  const userName =
    mail?.from.name.split(" ")[0][0] + mail?.from.name.split(" ")[1][0];

  const firstRecipient = mail.to[0];
  const isRecipientUser = firstRecipient._id === user.user._id;

  const formattedDate = formatDate(mail.createdAt);
  const [open, setOpen] = useState(false);
  const handlePaperOpen = () => {
    setOpen(!open);
  };

  const handlePaperClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ClickAwayListener onClickAway={handlePaperClose}>
        <Box sx={EmailInfoContainerStyle}>
          <Box sx={EmailAvatarContainerStyle}>
            <Avatar sx={EmailAvatarStyle}>{userName}</Avatar>
          </Box>
          <Box sx={{ ml: 1 }}>
            <Typography
              variant="body2"
              fontWeight={"bold"}
              sx={EmailFromToInfoStyle}
            >
              {`${mail.from.name} <${mail.from.emailId}>`}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
                to: {isRecipientUser ? "me" : firstRecipient.name.split(" ")[0]}
              </Typography>
              <Tooltip title="More info">
                <IconButton size="small" onClick={handlePaperOpen}>
                  <ArrowDropDown />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          <Typography variant="body2" sx={EmailDateStyle}>
            {formattedDate}
          </Typography>

          {open && (
            <Paper elevation={3} sx={EmailAllInfoStyle}>
              <Typography variant="body2">
                <strong> From: </strong>{" "}
                {`${mail.from.name} <${mail.from.emailId}>`}
              </Typography>

              <Typography variant="body2" sx={{ mt: 2 }}>
                <strong>To:</strong>{" "}
                {mail.to.map((recipient) =>
                  recipient._id === user.user._id
                    ? `me <${recipient.emailId}>`
                    : `${recipient.name} <${recipient.emailId}>`
                )}
              </Typography>

              {mail.cc && mail.cc.length > 0 && (
                <>
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    <strong>Cc:</strong>{" "}
                    {mail.cc.map(
                      (recipient) => `${recipient.name} <${recipient.emailId}>`
                    )}
                  </Typography>
                </>
              )}

              <Typography variant="body2" sx={{ mt: 2 }}>
                <strong>Date:</strong> {formattedDate}
              </Typography>

              <Typography variant="body2" sx={{ mt: 2 }}>
                <strong>Subject:</strong> {mail.subject}
              </Typography>
            </Paper>
          )}
        </Box>
      </ClickAwayListener>
      <Divider
        sx={{
          mt: 2,
        }}
      />
    </>
  );
};

export default EmailInfo;
