import Head from "next/head";
import React, { useEffect, useState } from "react";
import posts from "../../api/posts";
import TheContent from "../../components/Detail/TheContent";
import WrapContent from "../../components/Detail/WrapContent";
import InfiniteScroll from "../../components/InfiniteScroll";
import PostItem from "../../components/Post/PostItem";
import { useRouter } from "next/router";
import queryString from "query-string";
import SkeletonItem from "../../components/Skeleton/SkeletonItem";
function Tag({ term, apiUrl }) {
  const route = useRouter();
  const slug = route.query.slug;
  const [items, setItems] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const post = await posts.all({ term: slug });
      setItems(post);
    };
    fetchData();
  }, [apiUrl]);
  return (
    <>
      <Head>
        <title>{term.seo_title}</title>
        <meta name="description" content={term.description} />
        <term name="keywords" content={term.keyword} />
        <meta property="og:description" content={term.description} />
        <link rel="canonical" href={term.url} />
        <meta property="og:title" content={term.seo_title} />
        <meta property="og:type" content="article" />
        <meta property="og:image:type" content={term.mimeType} />
        <meta property="og:image:width" content={term.imageWidth} />
        <meta property="og:image:height" content={term.imageHeight} />
        <meta property="og:image:alt" content={term.seo_title} />
        <meta property="og:url" content={term.url} />
        <meta property="og:image" content={term.share_image} />
        <link rel="amphtml" href={term.amp_link} />
      </Head>
      {term.content && (
        <WrapContent>
          {" "}
          <TheContent content={term.content} />
        </WrapContent>
      )}
      {items.length === 0 && (
        <>
          <SkeletonItem /> <SkeletonItem />
        </>
      )}
      {items && (
        <InfiniteScroll
          items={items}
          setItems={setItems}
          apiUrl={apiUrl}
        >
          <PostItem />
        </InfiniteScroll>
      )}
    </>
  );
}
export async function getStaticPaths() {
  const APP_URL = process.env.API_URL2;
  const res = await fetch(`${APP_URL}/api/term/all2`);
  const data = await res.json();
  return {
    paths: data.map((x) => ({
      params: { slug: x.slug.toString() },
    })),
    fallback: `blocking`,
  };
}
export async function getStaticProps(context) {
  const APP_URL = process.env.API_URL2;
  const slug = context.params?.slug;
  const res_term = await fetch(`${APP_URL}/api/term/${slug}`);
  const data_term = await res_term.json();
  const url = queryString.stringifyUrl({
    url: `${APP_URL}/api/post`,
    query: { term: slug },
  });
  return {
    props: {
      apiUrl: url,
      term: data_term,
    },
    revalidate: 60,
  };
}

export default Tag;
