import sanitizeHtml from "sanitize-html";

export default function genCleanText(text) {
  const result = sanitizeHtml(text, {
    allowedTags: [],
    allowedAttributes: {},
  }).trim();
  return result;
}
