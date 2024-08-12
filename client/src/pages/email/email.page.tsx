import { useEffect } from "react";
import useGetMailById from "../../hooks/use-get-mail-by-id.hook";
import { useParams } from "react-router";
import {
  EmailBody,
  EmailInfo,
  EmailHeader,
  EmailFooter,
} from "./email-components";
import { Box } from "@mui/material";

const Email = () => {
  const { getEmailById, mail } = useGetMailById();
  const { id } = useParams();

  useEffect(() => {
    id && getEmailById(id);
  }, []); //eslint-disable-line

  return (
    mail && (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "95.2vh",
        }}
      >
        <EmailHeader mail={mail!} />
        <EmailInfo mail={mail!} />
        <EmailBody mail={mail!} />
        <EmailFooter mail={mail!} />
      </Box>
    )
  );
};

export default Email;
