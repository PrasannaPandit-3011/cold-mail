import { Box, Paper } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CreateMailType } from "../../types/mail-box.type";
import useUploadFile from "../../hooks/use-upload-file.hook";
import useSendEmail from "../../hooks/use-send-email.hook";
import { MailPriorityEnum } from "../../enums/priority.enums";
import { MailBody, MailButtons, MailHeader } from "./create-mail-components";
import {
  CreateMailPaperStyle,
  MailBodyBoxStyle,
  MailButtonBoxStyle,
  MailHeaderBoxStyle,
} from "./create-mail-styles";
import { ICreateMailProps } from "../../models";

const CreateMail: React.FC<ICreateMailProps> = ({
  openCompose,
  setOpenCompose,
}) => {
  const [openFullScreen, setOpenFullScreen] = useState<boolean>(false);
  const [attachmentName, setAttachmentName] = useState<string | null>(null);
  const [priority, setPriority] = useState<MailPriorityEnum>(
    MailPriorityEnum.NORMAL
  );

  const { control, handleSubmit, reset, setValue } = useForm<CreateMailType>();

  const { uploadFile, path } = useUploadFile();
  const { sendEmail } = useSendEmail();

  const onSubmit = async (data: CreateMailType) => {
    let emailData: CreateMailType;

    if (path.trim() !== "") {
      emailData = {
        ...data,
        attachment: path,
        type: priority,
      };
    } else {
      emailData = { ...data, type: priority };
    }
    await sendEmail(emailData);
    reset();
    setOpenCompose(false);
    setAttachmentName(null);
  };

  const handleFileUpload = async (file: File) => {
    await uploadFile(file);
    setAttachmentName(file.name);
    setValue("attachment", path);
  };

  const handleClose = () => {
    reset();
    setOpenCompose(false);
    setAttachmentName(null);
  };

  return (
    openCompose && (
      <Paper
        variant="elevation"
        elevation={15}
        sx={CreateMailPaperStyle(openFullScreen)}
      >
        <Box sx={MailHeaderBoxStyle}>
          <MailHeader
            setOpenFullScreen={setOpenFullScreen}
            openFullScreen={openFullScreen}
            handleClose={handleClose}
          />
        </Box>
        <Box sx={MailBodyBoxStyle}>
          <MailBody control={control} openFullScreen={openFullScreen} />
        </Box>
        <Box sx={MailButtonBoxStyle}>
          <MailButtons
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            uploadFile={handleFileUpload}
            handleClose={handleClose}
            attachmentName={attachmentName}
            setPriority={setPriority}
            openFullScreen={openFullScreen}
          />
        </Box>
      </Paper>
    )
  );
};

export default CreateMail;
