export const renderContent = (content: string) => {
  const tempElement = document.createElement("div");
  tempElement.innerHTML = content;
  let plainTextContent = tempElement.textContent || "";
  plainTextContent =
    plainTextContent.length > 50
      ? `${plainTextContent.substring(0, 50)}...`
      : plainTextContent;
  return plainTextContent.trim();
};
