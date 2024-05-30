import { marked } from "marked";

export function convertMarkdownToHTML(markdown) {
  // Use marked library to convert Markdown to HTML
  const html = marked(markdown);
  return html;
}

export function htmlToMarkdown(html) {
  let markdown = html
    // Replace <br> tags with newline
    .replace(/<br\s*\/?>/gi, "\n")
    // Replace <p> tags with newline and two spaces (to start a new line in Markdown)
    .replace(/<p[^>]*>/gi, "")
    .replace(/<\/p>/gi, "\n\n")
    // Replace <strong> tags with **
    .replace(/<strong[^>]*>/gi, "**")
    .replace(/<\/strong>/gi, "**")
    // Replace <em> tags with *
    .replace(/<em[^>]*>/gi, "*")
    .replace(/<\/em>/gi, "*")
    // Replace <a> tags with [text](href)
    .replace(
      /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1[^>]*>(.*?)<\/a>/gi,
      "[$3]($2)"
    )
    // Remove all other HTML tags
    .replace(/<[^>]+>/gi, "");

  // Decode HTML entities
  markdown = decodeHtmlEntities(markdown);

  return markdown;
}

function decodeHtmlEntities(text) {
  const entities = [
    ["amp", "&"],
    ["apos", "'"],
    ["lt", "<"],
    ["gt", ">"],
    ["quot", '"'],
    ["#39", "'"],
    ["#x27", "'"],
    ["#x2F", "/"],
    ["#x5C", "\\"],
    ["#x22", '"'],
    ["#x3C", "<"],
    ["#x3E", ">"],
  ];

  entities.forEach(([code, char]) => {
    const entityPattern = new RegExp(`&${code};`, "g");
    text = text.replace(entityPattern, char);
  });

  return text;
}
