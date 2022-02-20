import React from "react";

export default function TheContent({ content }) {
  function htmlspcecial_decode(text) {
    var map = {
      "&amp;": "&",
      "&#038;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&quot;": '"',
      "&#039;": "'",
      "&#8217;": "’",
      "&#8216;": "‘",
      "&#8211;": "–",
      "&#8212;": "—",
      "&#8230;": "…",
      "&#8221;": "”",
    };
    return text.replace(/\&[\w\d\#]{2,5}\;/g, function (m) {
      return map[m];
    });
  }
  return (
    <>
      <article
        className="the_content"
        dangerouslySetInnerHTML={{ __html: htmlspcecial_decode(content) }}
      ></article>
    </>
  );
}
