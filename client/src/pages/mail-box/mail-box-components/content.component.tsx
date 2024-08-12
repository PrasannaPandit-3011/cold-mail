import { Box } from "@mui/material";
import React from "react";
import { renderContent } from "../../../utils";
import { IEmailProps } from "../../../models";

const Content: React.FC<IEmailProps> = ({ mail }) => {
  const mailSubject =
    mail?.subject.length > 20 ? mail?.subject.substring(0, 20) : mail?.subject;
  const mailBody =
    mail?.body.length > 50 ? `${mail?.body.substring(0, 50)}...` : mail?.body;
  const body = renderContent(mailBody || "");
  return (
    <Box
      sx={{
        fontWeight:
          typeof mail.read !== "undefined"
            ? mail.read
              ? "normal"
              : "bolder"
            : "normal",
        fontStyle:
          typeof mail.read !== "undefined"
            ? mail.read
              ? "italic"
              : "normal"
            : "normal",
      }}
    >
      {`${mailSubject} - ${body}`}
    </Box>
  );
};

export default Content;
