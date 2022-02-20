import PostStyles from "../../styles/Post.module.scss";
import Link from "next/link";
import LazyImage from "../LazyImage";
export default function PostView({ item }) {
  return (
    <div className={PostStyles["post-view"]}>
      <Link href={`/meme/${item.slug}`}>
        <a>
          <span className="wrap-image">
            <span
              className="aspect-ratio-box"
              style={{ paddingBottom: item.ratio + `%` }}
            >
              <LazyImage
                src={item.thumbnail}
                alt={item.post_title}
                width={item.width}
                height={item.height}
              />
            </span>
          </span>
        </a>
      </Link>
    </div>
  );
}
