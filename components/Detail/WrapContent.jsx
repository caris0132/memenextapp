import React, { useEffect, useCallback, useState } from "react";
import Router from "next/router";
export default function WrapContent({ children }) {
  const [expand, setExpand] = useState(false);
  useEffect(() => {
    Router.events.on("routeChangeComplete", () => {
      setExpand(false);
    });
  }, []);
  //   const toggleContent = useCallback((e) => {
  //     e.preventDefault();
  //     let _this = e.target;
  //     let target = _this.getAttribute("data-target");
  //     let main_content = document.querySelector(`${target}`);
  //     let hide_content = document.querySelector(`${target} > .hide-content`);
  //     if (!_this.classList.contains(`is-show`)) {
  //       main_content.classList.add(`show-full-content`);
  //       hide_content.classList.add(`removeBlur`);
  //       _this.classList.add(`is-show`);
  //       _this.innerText = "Thu gọn";
  //     } else {
  //       main_content.classList.remove(`show-full-content`);
  //       hide_content.classList.remove(`removeBlur`);
  //       _this.classList.remove(`is-show`);
  //       _this.innerText = "Đọc thêm";
  //     }
  //   }, []);

  //   useEffect(() => {
  //     const toggleContent = (e) => {
  //       e.preventDefault();
  //       setExpand(!expand);
  //     };
  //     const button = document.querySelector(`.btn-view-full-content`);
  //     button.addEventListener(`click`, toggleContent);
  //     return () => {
  //       button.removeEventListener(`click`, toggleContent);
  //     };
  //   }, [expand]);

  return (
    <div
      className={`the-service-content` + (expand ? " show-full-content" : "")}
      id="noidung"
    >
      {children}
      <div className={`hide-content` + (expand ? "removeBlue" : "")}>
        <a
          href="#!"
          className="btn-view-full-content"
          data-target="#noidung"
          onClick={() => {
            setExpand(!expand);
          }}
        >
          {expand ? "Thu gọn" : "Đọc thêm"}
        </a>
      </div>
    </div>
  );
}
