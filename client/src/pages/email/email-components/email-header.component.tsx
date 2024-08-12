import { ArrowBack, DeleteSharp } from "@mui/icons-material";
import { Box, Divider, IconButton, Tooltip } from "@mui/material";
import { useNavigate } from "react-router";
import useTrashEmail from "../../../hooks/use-trash-email.hook";
import { IEmailProps } from "../../../models";
import {
  EmailDeleteButtonStyle,
  EmailDividerStyle,
  EmailHeaderContainerStyle,
  EmailIconsStyle,
} from "../email-styles";

const EmailHeader: React.FC<IEmailProps> = ({ mail }) => {
  const navigate = useNavigate();
  const { trashEmail } = useTrashEmail();
  return (
    <>
      <Box sx={EmailHeaderContainerStyle}>
        <Tooltip title="Go back">
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBack />
          </IconButton>
        </Tooltip>
        <Tooltip title="Move to trash">
          <IconButton
            sx={EmailDeleteButtonStyle}
            onClick={(e) => {
              e.stopPropagation();
              trashEmail(mail._id!, true);
              navigate(-1);
            }}
          >
            <DeleteSharp sx={EmailIconsStyle} />
          </IconButton>
        </Tooltip>
      </Box>
      <Divider variant="fullWidth" sx={EmailDividerStyle} />
    </>
  );
};

export default EmailHeader;
