import PostStyles from "../../styles/Post.module.scss";
import PostView from "./PostView";
import PostHeader from "./PostHeader";
export default function PostItem({ post }) {
  return (
    <article className={PostStyles["post-item"]}>
      <PostHeader
        header={{
          post_title: post.post_title,
          slug: post.slug + `-` + post.id,
          origin_image: post.origin_image
        }}
        tag="h2"
        term={post.term}
      />
      <div className="post-container">
        <PostView
          item={{
            slug: post.slug + `-` + post.id,
            post_title: post.post_title,
            width: post.width,
            height: post.height,
            ratio: post.ratio,
            thumbnail: post.thumbnail,
          }}
        />
      </div>
    </article>
  );
}
