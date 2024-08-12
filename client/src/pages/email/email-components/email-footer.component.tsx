import React from "react";
import { Typography, Box, Card, Button } from "@mui/material";
import { DownloadSharp } from "@mui/icons-material";
import useDownloadAttachement from "../../../hooks/use-download-attachment.hook";
import { IEmailProps } from "../../../models";
import {
  EmailAttachementCardMailStyle,
  EmailAttachmentNameStyle,
  EmailButtonStyle,
  EmailFooterBoxStyle,
} from "../email-styles";

const EmailFooter: React.FC<IEmailProps> = ({ mail }) => {
  const attachment = mail.attachment && mail.attachment.split("/")[1];
  const { downloadAttachment } = useDownloadAttachement();

  const handleDownload = (id: string, path: string) => {
    downloadAttachment(id, path);
  };

  return (
    <Box sx={EmailFooterBoxStyle}>
      {attachment && (
        <Card sx={EmailAttachementCardMailStyle}>
          <Typography
            className="shortName"
            variant="body2"
            color="primary.light"
            fontWeight="bold"
            sx={EmailAttachmentNameStyle}
          >
            {attachment.length > 20
              ? `${attachment.substring(0, 20)}...`
              : attachment}
          </Typography>
          <Button
            variant="contained"
            sx={EmailButtonStyle}
            onClick={() => handleDownload(mail._id!, mail.attachment!)}
          >
            <DownloadSharp />
          </Button>
        </Card>
      )}
    </Box>
  );
};

export default EmailFooter;
