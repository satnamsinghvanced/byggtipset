export const cleanHtmlContent = (htmlContent: string) => {
  if (!htmlContent) return "";
  // Remove <title> tags
  let cleaned = htmlContent.replace(/<title[^>]*>[\s\S]*?<\/title>/gi, "");
  // Remove <meta> tags
  cleaned = cleaned.replace(/<meta[^>]*>/gi, "");
  // Remove canonical <link> tags
  cleaned = cleaned.replace(/<link[^>]*rel=["']canonical["'][^>]*>/gi, "");
  return cleaned;
};
