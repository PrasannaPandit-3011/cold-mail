import { AttachFileSharp, DeleteSharp, SendSharp } from "@mui/icons-material";
import {
  Button,
  IconButton,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";
import {
  AttachIconButtonStyle,
  AttachmentInfoStyle,
  DeleteIconButtonStyle,
  IconColorStyle,
  MailButtonFormControl,
  SendButtonStyles,
} from "../create-mail-styles";
import { MailPriorityEnum } from "../../../enums/priority.enums";
import { IMailButtonProps } from "../../../models";

const MailButtons: React.FC<IMailButtonProps> = ({
  handleSubmit,
  onSubmit,
  uploadFile,
  handleClose,
  attachmentName,
  setPriority,
  openFullScreen,
}) => {
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      await uploadFile(event.target.files[0]);
    }
  };

  const handlePriorityChange = (event: SelectChangeEvent<MailPriorityEnum>) => {
    setPriority(event.target.value as MailPriorityEnum);
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={handleSubmit(onSubmit)}
        endIcon={<SendSharp sx={IconColorStyle} />}
        sx={SendButtonStyles}
      >
        <Typography
          variant="button"
          fontFamily={"monserrat"}
          fontSize={"large"}
          fontWeight={"bold"}
          color={"primary.light"}
        >
          Send
        </Typography>
      </Button>
      <input
        type="file"
        id="file-upload"
        style={{ display: "none" }}
        onChange={handleFileUpload}
      />
      <label htmlFor="file-upload">
        <IconButton component="span" sx={AttachIconButtonStyle}>
          <AttachFileSharp sx={IconColorStyle} />
        </IconButton>
      </label>
      {attachmentName && (
        <Box sx={AttachmentInfoStyle}>
          <Typography variant="body2" color="primary.light">
            {attachmentName}
          </Typography>
        </Box>
      )}
      <FormControl sx={MailButtonFormControl(openFullScreen)}>
        <InputLabel id="priority-label">Priority</InputLabel>
        <Select
          labelId="priority-label"
          defaultValue={MailPriorityEnum.NORMAL}
          onChange={(e) => handlePriorityChange(e)}
        >
          <MenuItem value={MailPriorityEnum.NORMAL}>Normal</MenuItem>
          <MenuItem value={MailPriorityEnum.HIGH}>High</MenuItem>
          <MenuItem value={MailPriorityEnum.LOW}>Low</MenuItem>
        </Select>
      </FormControl>
      <IconButton onClick={handleClose} sx={DeleteIconButtonStyle}>
        <DeleteSharp sx={IconColorStyle} />
      </IconButton>
    </>
  );
};

export default MailButtons;
