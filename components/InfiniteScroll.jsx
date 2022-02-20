/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Progress } from "reactstrap";
import queryString from "query-string";
export default function InfiniteScroll({ items, setItems, apiUrl, children }) {
  const [loadMore, setLoadMore] = useState(false);
  const [end, setEnd] = useState(false);
  const [nextPage, setNextPage] = useState(2);
  const [spinner, setSpinner] = useState(false);
  useEffect(() => {
    const list = document.getElementById(`infinite-scroll`);
    const handleScroll = () => {
      if (
        window.scrollY + window.innerHeight >=
          list.clientHeight + list.offsetTop - 300 &&
        !loadMore
      ) {
        setLoadMore(!loadMore);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setLoadMore(false);
    setEnd(false);
    setSpinner(false);
    setNextPage(2);
  }, [apiUrl]);

  useEffect(() => {
    getData();
  }, [loadMore]);

  const getData = async () => {
    if (loadMore && !end) {
      setSpinner(true);
      const data = await fetch(
        queryString.stringifyUrl({ url: apiUrl, query: { page: nextPage } })
      );
      const j = await data.json();
      setEnd(j.length ? false : true);
      const clone = [...items];
      setLoadMore(!loadMore);
      setNextPage((nextPage) => {
        return nextPage + 1;
      });
      setItems(clone.concat(j));
      setSpinner(false);
    }
  };

  return (
    <>
      <div className="post-list" id="infinite-scroll">
        {items.map((post) => {
          return React.cloneElement(children, {post,key: `post_${post.id}`});
        })}
      </div>
      {spinner && <Progress animated color="success" varlue={100} />}
    </>
  );
}
