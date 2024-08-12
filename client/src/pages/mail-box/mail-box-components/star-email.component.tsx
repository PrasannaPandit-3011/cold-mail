import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { IconButton, Tooltip } from "@mui/material";
import { useSetAtom } from "jotai";
import { mailboxAtom } from "../../../atoms";
import { useStarEmail } from "../../../hooks";
import { IconColorStyle } from "../../create-mail/create-mail-styles";
import { IEmailProps } from "../../../models";

const StarEmail: React.FC<IEmailProps> = ({ mail }) => {
  const setMailBox = useSetAtom(mailboxAtom);
  const { starEmail } = useStarEmail();

  return (
    <Tooltip title="Star email">
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          setMailBox((prev) =>
            prev.map((m) =>
              m._id === mail._id ? { ...m, isFavorite: !mail.isFavorite } : m
            )
          );
          starEmail(mail._id!, !mail.isFavorite);
        }}
      >
        {mail.isFavorite ? (
          <StarIcon sx={IconColorStyle} />
        ) : (
          <StarBorderIcon sx={IconColorStyle} />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default StarEmail;
