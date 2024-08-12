import InboxIcon from "@mui/icons-material/MoveToInbox";
import StarredIcon from "@mui/icons-material/StarBorderPurple500Sharp";
import SendIcon from "@mui/icons-material/SendSharp";
import DeleteIcon from "@mui/icons-material/DeleteSharp";
import { Paths } from "../enums/paths.enums";

export type MenuOptionType = {
  title: string;
  icon: React.ReactElement<unknown>;
  path: string;
};

export const menuButtons: MenuOptionType[] = [
  { title: "Inbox", icon: <InboxIcon />, path: Paths.INBOX },
  { title: "Outbox", icon: <SendIcon />, path: Paths.OUTBOX },
  { title: "Starred", icon: <StarredIcon />, path: Paths.STARRED },
  { title: "Trash", icon: <DeleteIcon />, path: Paths.TRASHED },
];
