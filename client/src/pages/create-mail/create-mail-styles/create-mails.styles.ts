export const CreateMailPaperStyle = (openFullScreen: boolean) => {
  return {
    position: "absolute",
    bottom: openFullScreen ? 17 : 0,
    right: openFullScreen ? 40 : 100,
    width: openFullScreen ? { lg: "1600px", md: "900px" } : "600px",
    height: openFullScreen ? { lg: "850px", md: "750" } : "750px",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "primary.main",
    color: "primary.contrastText",
    zIndex: 1200,
  };
};

export const MailHeaderBoxStyle = {
  width: 1,
  flex: 0.05,
  display: "flex",
};

export const MailBodyBoxStyle = {
  width: 1,
  flex: 0.85,
  display: "flex",
  flexDirection: "column",
};

export const MailButtonBoxStyle = {
  width: 1,
  flex: 0.1,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  p: 1,
};
