export const SendButtonStyles = {
  ml: 2,
  mt: 0.9,
  height: 0.6,
  width: 125,
  borderRadius: 50,
  p: 1,
};

export const IconColorStyle = { color: "primary.light" };

export const AttachIconButtonStyle = {
  ml: 1,
  mt: 1,
  height: 0.8,
  borderRadius: 50,
};

export const AttachmentInfoStyle = {
  display: "flex",
  alignItems: "center",
  ml: 2,
  mt: 1,
};

export const DeleteIconButtonStyle = {
  ml: "auto",
  mr: 1,
  mt: 1,
  height: 0.8,
  borderRadius: 50,
};

export const MailButtonFormControl = (openFullScreen: boolean) => {
  return {
    mx: openFullScreen ? 0 : "auto",
    width: openFullScreen ? 1 : 0.3,
  };
};
