import { Typography } from "@mui/material";
import { IActionProps } from "../../../models";

const FromToColoumn: React.FC<IActionProps> = ({ mailBoxType, mail }) => {
  if (mailBoxType === "outbox") {
    if (mail.to && mail.to.length > 0) {
      if (
        mail.to.length === 1 &&
        (!mail.cc || mail.cc.length === 0) &&
        (!mail.bcc || mail.bcc.length === 0)
      ) {
        return (
          <Typography variant="body1" fontWeight="bolder">
            {mail.to[0].name}
          </Typography>
        );
      } else {
        return (
          <Typography variant="body1" fontWeight="bolder">
            {`${mail.to[0].name}, ...`}
          </Typography>
        );
      }
    } else {
      return (
        <Typography variant="body1" fontWeight="bolder">
          - No recipient -
        </Typography>
      );
    }
  } else {
    return (
      <Typography variant="body1" fontWeight="bolder">
        {mail.from.name}
      </Typography>
    );
  }
};

export default FromToColoumn;
