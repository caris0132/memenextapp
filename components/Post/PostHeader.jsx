import Link from "next/link";
import PostStyles from "../../styles/Post.module.scss";
import React, { useState } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap";
import PostHeaderTerm from "./PostHeaderTerm";
export default function PostHeader({ header, tag, term }) {

  const [toggle,setToggle] = useState(false);
  let tag_header = "";
  let permalink = (
    <Link href={`/meme/${header.slug}`}>
      <a>{header.post_title}</a>
    </Link>
  );
  if (typeof type !== "undefined" && tag === "h1") {
    tag_header = (
      <h1 className={PostStyles["post-title"]}>{header.post_title}</h1>
    );
  } else {
    tag_header = <h2 className={PostStyles["post-title"]}>{permalink}</h2>;
  }
  return (
    <header className={PostStyles["post-header"]}>
      <div className={PostStyles["post-header-left"]}>
        {term && <PostHeaderTerm term={term} />}
        {tag_header}
      </div>
      <Dropdown isOpen={toggle} toggle={() => setToggle(!toggle)}>
        <DropdownToggle color="light" className={PostStyles["post-dropdown-menu"] + ` dropdown-toggle`}>
          <span className={PostStyles["dots"]}></span>
        </DropdownToggle>
        <DropdownMenu end>
          <DropdownItem>
            <a href={header.origin_image} download>Tải xuống</a>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </header>
  );
}
