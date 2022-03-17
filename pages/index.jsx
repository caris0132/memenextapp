import Head from "next/head";
import React, { useState, useEffect } from "react";
import InfiniteScroll from "../components/InfiniteScroll";
import PostItem from "../components/Post/PostItem";
import posts from "../api/posts";
import SkeletonItem from "../components/Skeleton/SkeletonItem";
export default function Home({ meta, apiUrl }) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const post = await posts.all();
      setItems(post);
    };
    fetchData();
  }, [apiUrl]);
  return (
    <>
      <Head>
        <title>{meta.site_name}</title>
        <meta name="description" content={meta.site_description} />
        <meta name="keywords" content={meta.site_keyword} />
        <link rel="canonical" href={meta.url} />
        <link rel="amphtml" href={meta.amp_link} />
        <meta property="og:title" content={meta.site_name} />
        <meta property="og:type" content="article" />
        <meta property="og:image:type" content={meta.imageWidth} />
        <meta property="og:image:width" content={meta.imageHeight} />
        <meta property="og:image:height" content={meta.mimeType} />
        <meta property="og:image:alt" content={meta.site_name} />
        <meta property="og:url" content={meta.url} />
        <meta property="og:image" content={meta.share_image} />
      </Head>
      <h1 className="heading-invisible">{meta.site_name}</h1>
      {items.length === 0 && (
        <>
          <SkeletonItem />
          <SkeletonItem />
        </>
      )}
      {items && (
        <InfiniteScroll items={items} setItems={setItems} apiUrl={apiUrl}>
          <PostItem />
        </InfiniteScroll>
      )}
    </>
  );
}
export async function getStaticProps(context) {
  const APP_URL = process.env.API_URL2;
  const res_home_page = await fetch(`${APP_URL}/api/page/home`);
  const data_home_page = await res_home_page.json();

  return {
    props: {
      meta: data_home_page,
      apiUrl: `${APP_URL}/api/post`,
    },
    revalidate: 60,
  };
}
