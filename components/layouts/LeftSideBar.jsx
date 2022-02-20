import React from "react";
import TermItem from "../Term/TermItem";
function LeftSideBar({ classHtml, term }) {
  return (
    <div className={`left-sidebar ${classHtml}`}>
      <div className="left-sidebar-container">
        <h5>Tất cả danh mục</h5>
        <div>
          {term &&
            term.map((item) => {
              return <TermItem item={item} key={`term_${item.id}`} />;
            })}
        </div>
      </div>
    </div>
  );
}
export default React.memo(LeftSideBar);
