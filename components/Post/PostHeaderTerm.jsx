import Link from "next/link";
import { useEffect } from "react";
import PostStyles from "../../styles/Post.module.scss";
export default function PostHeaderTerm({ term }) {
  return (
    <>
      <style jsx>{`
        figure {
          background-image: url(${term.thumbnail});
        }
      `}</style>
      <div className={PostStyles["post-term-header"]}>
        <figure className="position-relative">
          <Link href={`/tag/${term.slug}`}>
            <a className="full"></a>
          </Link>
        </figure>
        <div className={PostStyles["post-term-header-title"]}>
          <Link href={`/tag/${term.slug}`}>
            <a>{term.title}</a>
          </Link>
        </div>
      </div>
    </>
  );
}
