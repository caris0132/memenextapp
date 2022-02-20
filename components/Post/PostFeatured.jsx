import Link from "next/link";
import LazyImage from "../LazyImage";
export default function PostFeatured({ item }) {
  return (
    <>
      <div className="sidebar-post-container position-relative">
        <Link href={`/${item.url}`}>
          <a className="full"></a>
        </Link>
        <div className="sidebar-post-thumbnail">
          <LazyImage src={item.thumbnail} alt={item.post_title} />
        </div>
        <div className="sidebar-post-title">{item.post_title}</div>
      </div>
    </>
  );
}
