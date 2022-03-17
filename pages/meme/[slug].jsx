import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import LazyLoad from "vanilla-lazyload";
import TheContent from "../../components/Detail/TheContent";
import Thumbnail from "../../components/Detail/Thumbnail";
import InfiniteScroll from "../../components/InfiniteScroll";
import PostHeader from "../../components/Post/PostHeader";
import lazyloadConfig from "../../config/lazyload";
import PostItem from "../../components/Post/PostItem";
function Detail({ item, meta, term, apiUrl }) {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const url = `${apiUrl}?cmd=bai-viet-khac`;
  useEffect(() => {
    const getMorePost = async () => {
      const res = await fetch(url);
      const data = await res.json();
      setItems(data);
    };
    getMorePost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiUrl]);

  useEffect(() => {
    if (!document.lazyLoadInstance) {
      document.lazyLoadInstance = new LazyLoad(lazyloadConfig);
    }
    document.lazyLoadInstance.update();
  }, []);

  if (router.isFallback) {
    return (
      <div style={{ fontSize: `2rem`, textAlign: `center` }}>Loading...</div>
    );
  }
  const thumbnail = {
    thumbnail: item.thumbnail,
    title: item.title,
    width: item.imageWidth,
    height: item.imageHeight,
  };

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keyword} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:type" content="article" />
        <meta property="og:image:type" content={meta.mimeType} />
        <meta property="og:image:width" content={meta.imageWidth} />
        <meta property="og:image:height" content={meta.imageHeight} />
        <meta property="og:image:alt" content={meta.title} />
        <meta property="og:url" content={meta.url} />
        <link rel="canonical" href={meta.url} />
        <meta property="og:image" content={meta.share_image} />
        <link rel="amphtml" href={meta.amp_link} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "http://schema.org",
              "@type": "NewsArticle",
              name: meta.title,
              description: meta.description,
              url: meta.url,
              image: meta.share_image,
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": meta.url,
              },
              headline: meta.title,
              author: {
                "@type": "Person",
                name: "memevui.com",
                url: "https://memevui.com",
              },
              datePublished: meta.datePublished,
              dateModified: meta.dateModified,
              publisher: {
                "@type": "Organization",
                name: "Meme vui",
                logo: {
                  "@type": "ImageObject",
                  url: "/images/memevui.svg",
                },
              },
            }),
          }}
        ></script>
      </Head>
      <main>
        <PostHeader
          tag="h1"
          term={term[0]}
          header={{
            post_title: item.title,
            slug: item.slug,
            origin_image: item.origin_image
          }}
        />
        <Thumbnail thumbnail={thumbnail} />
        {item.content && <TheContent content={item.content} />}
        <div className="post-more-divider">
          <h4>Các bài đăng khác từ MEMEVUI</h4>
        </div>
        {items && (
          <InfiniteScroll items={items} setItems={setItems} apiUrl={url}>
            <PostItem />
          </InfiniteScroll>
        )}
      </main>
    </>
  );
}
export async function getStaticPaths() {
  const API_URL = process.env.API_URL2;  
  const res = await fetch(`${API_URL}/api/post/1000post`);
  // console.log(`--------------------------------body--------------------------------`,await res.text());
  const data = await res.json();
  return {
    paths: data.map((x) => ({
      params: { slug: x.slug.toString() + `-` + x.id.toString() },
    })),
    fallback: `blocking`,
  };
}
export async function getStaticProps(context) {
  const slug = context.params?.slug;
  const postId = parseInt(slug.substring(slug.lastIndexOf("-") + 1));
  if (!postId) return { notFound: true };
  const API_URL = process.env.API_URL2;
  const url = `${API_URL}/api/post/${postId}`;
  const res = await fetch(url);
  const data = await res.json();
  // console.log(res.text());
  if (data.notFound === true) return { notFound: true };

  return {
    props: {
      item: data.item,
      meta: data.meta,
      term: data.this_term,
      postId: postId,
      apiUrl: url,
    },
    revalidate: 60,
  };
}
export default Detail;
