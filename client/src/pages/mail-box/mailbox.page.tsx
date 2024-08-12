import Typography from "@mui/material/Typography";
import { MailBoxTable } from "./mail-box-components";

interface IMailBoxProps {
  mailBoxType: string;
}

const MailBox: React.FC<IMailBoxProps> = ({ mailBoxType }) => {
  return (
    <>
      <Typography variant="h4" color="primary.light">
        {mailBoxType.toLocaleUpperCase()}
      </Typography>
      <MailBoxTable mailBoxType={mailBoxType} />
    </>
  );
};

export default MailBox;
