import React, { useEffect, useState } from "react";
import posts from "../../api/posts";
import { Progress } from "reactstrap";
import PostFeatured from "../Post/PostFeatured";
import SkeletonSmallItem from "../Skeleton/SkeletonSmallItem";
export default function RightSideBar() {
  const [items, setItems] = useState([]);
  const [loadMore, setLoadMore] = useState(false);
  const [end, setEnd] = useState(false);
  const [nextPage, setNextPage] = useState(2);
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    const list = document.getElementById(`in2-scroll`);
    const handleScroll = () => {
      if (
        list.scrollTop + list.clientHeight >= list.children[0].scrollHeight &&
        !loadMore
      ) {
        setLoadMore(!loadMore);
      }
    };
    list.addEventListener("scroll", handleScroll);
    return () => {
      list.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setLoadMore(false);
    setEnd(false);
    setSpinner(false);
    setNextPage(2);
  }, []);

  useEffect(() => {
    getData();
  }, [loadMore]);

  useEffect(() => {
    const getFirstData = async () => {
      const data = await posts.featured({ page: 1 });
      setItems(data);
    };
    getFirstData();
  }, []);

  const getData = async () => {
    if (loadMore && !end) {
      setSpinner(true);
      const data = await posts.featured({ page: nextPage });
      const clone = [...items];
      setEnd(data.length ? false : true);
      setLoadMore(!loadMore);
      setNextPage((prevPage) => {
        return prevPage + 1;
      });
      setItems(clone.concat(data));
      setSpinner(false);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <h4>Bài viết nổi bật</h4>
        <div className="in2">
          <div className="in2-scroll" id="in2-scroll">
            <div className="infinite-list">
              {items.length === 0 &&
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <SkeletonSmallItem key={num}/>
                ))}
              {items.map((item) => {
                return <PostFeatured item={item} key={item.id} />;
              })}
              {spinner && <Progress animated color="success" varlue={100} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
