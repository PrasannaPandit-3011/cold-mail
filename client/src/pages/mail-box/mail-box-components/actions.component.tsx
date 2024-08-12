import { useSetAtom } from "jotai";
import { IActionProps } from "../../../models";
import { mailboxAtom } from "../../../atoms";
import { useDeleteEmail, useReadEmail, useTrashEmail } from "../../../hooks";
import useDownloadAttachement from "../../../hooks/use-download-attachment.hook";
import { Box, IconButton, Tooltip } from "@mui/material";
import {
  AttachFileSharp,
  DeleteForeverSharp,
  MarkunreadSharp,
  RestoreSharp,
} from "@mui/icons-material";
import { IconColorStyle } from "../../create-mail/create-mail-styles";

const Actions: React.FC<IActionProps> = ({ mail, mailBoxType }) => {
  const setMailBox = useSetAtom(mailboxAtom);
  const { readEmail } = useReadEmail();
  const { deleteEmail } = useDeleteEmail();
  const { trashEmail } = useTrashEmail();
  const { downloadAttachment } = useDownloadAttachement();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
      }}
    >
      {mailBoxType === "trashed" ? (
        <>
          <Tooltip title="Delete forever">
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                setMailBox((prev) => prev.filter((m) => m._id !== mail._id));
                deleteEmail(mail._id!);
              }}
            >
              <DeleteForeverSharp sx={IconColorStyle} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Restore from trash">
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                setMailBox((prev) =>
                  prev
                    .map((m) =>
                      m._id === mail._id ? { ...m, trashed: false } : m
                    )
                    .filter((m) => m._id !== mail._id)
                );
                trashEmail(mail._id!, false);
              }}
            >
              <RestoreSharp sx={IconColorStyle} />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <Tooltip title="Move to trash">
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              setMailBox((prev) => prev.filter((m) => m._id !== mail._id));
              trashEmail(mail._id!, true);
            }}
          >
            <DeleteForeverSharp sx={IconColorStyle} />
          </IconButton>
        </Tooltip>
      )}
      {typeof mail.read !== "undefined" && (
        <Tooltip title="Mark as unread">
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              setMailBox((prev) =>
                prev.map((m) =>
                  m._id === mail._id ? { ...m, read: false } : m
                )
              );
              readEmail(mail._id!, false);
            }}
          >
            <MarkunreadSharp sx={IconColorStyle} />
          </IconButton>
        </Tooltip>
      )}
      {mail.attachment && (
        <Tooltip title="Downlaod Attachment">
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              downloadAttachment(mail._id!, mail.attachment!);
            }}
          >
            <AttachFileSharp sx={IconColorStyle} />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
};

export default Actions;
