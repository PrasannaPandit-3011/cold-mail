export const EmailFooterBoxStyle = {
  p: 2,
};

export const EmailAttachementCardMailStyle = {
  width: 175,
  height: 150,
  p: 1,
  position: "relative",
  overflow: "hidden",
  "&:hover .shortName": {
    display: "none",
  },
  "&:hover .fullName": {
    display: "block",
  },
};

export const EmailAttachmentNameStyle = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  width: "100%",
  display: "block",
};

export const EmailButtonStyle = { mt: 7, mx: 5.5 };
