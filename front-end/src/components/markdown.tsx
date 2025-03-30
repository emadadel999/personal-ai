import React from "react";
import markdownit from 'markdown-it';
import hljs from "highlight.js";
import { markdownItTable } from "markdown-it-table";

function renderMarkdownToHTML(markdown: string) {
  const md = new markdownit({
    html: true,
    typographer: true,
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(str, { language: lang }).value;
        } catch (__) {}
      }
  
      return ''; // use external default escaping
    },
    linkify: true
  }).use(markdownItTable);

  // This is ONLY safe because the output HTML
  // is shown to the same user, and because you
  // trust this Markdown parser to not have bugs.
  const renderedHTML = md.render(markdown);
  return { __html: renderedHTML };
}

export default function Markdown({markdown, className }: { markdown: string; className: string }) {
  const markup = renderMarkdownToHTML(markdown);
  return <p className={className} dangerouslySetInnerHTML={markup}></p>;
}
