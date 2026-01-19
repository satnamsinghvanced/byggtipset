export const cleanHtmlContent = (htmlContent: string) => {
  if (!htmlContent) return "";
  let cleaned = htmlContent.replace(/<title[^>]*>[\s\S]*?<\/title>/gi, "");
  cleaned = cleaned.replace(/<meta[^>]*>/gi, "");
  cleaned = cleaned.replace(/<link[^>]*rel=["']canonical["'][^>]*>/gi, "");
   cleaned = cleaned.replace(
    /\[text:(.+?),\s*link:(https?:\/\/[^\]]+)\]/gi,
    (_match, text, link) => `<a href="${link}" target="_blank" rel="noopener noreferrer">${text}</a>`
  );
  return cleaned;
};
  