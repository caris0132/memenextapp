import queryString from "query-string";
import InfiniteScroll from "../components/InfiniteScroll";
import PostItem from "../components/Post/PostItem";
import React, { useState } from "react";
export default function TimKiem({ posts, apiUrl }) {
  const [items, setItems] = useState(posts);
  return (
    <>
      {posts && (
        <InfiniteScroll items={items} setItems={setItems} apiUrl={apiUrl}>
          <PostItem />
        </InfiniteScroll>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const APP_URL = process.env.API_URL;
  const keyword = context.query?.keyword;
  const url = queryString.stringifyUrl({
    url: `${APP_URL}/api/post`,
    query: { keyword: keyword },
  });
  const data = await fetch(url);
  const res = await data.json();
  return {
    props: {
      posts: res,
      apiUrl: url
    },
  };
}
