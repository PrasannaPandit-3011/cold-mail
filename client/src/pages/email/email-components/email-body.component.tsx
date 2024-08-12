import React from "react";
import parser from "html-react-parser";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import { IEmailProps } from "../../../models";
import { EmailBodyStyle } from "../email-styles";

const EmailBody: React.FC<IEmailProps> = ({ mail }) => {
  return (
    <div>
      <Typography variant="h5" fontFamily={"montserrat"} sx={EmailBodyStyle}>
        {mail.subject}
      </Typography>
      {parser(mail.body)}
      <Divider sx={EmailBodyStyle} />
    </div>
  );
};

export default EmailBody;
