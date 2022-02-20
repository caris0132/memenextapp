import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMediaWidth, toggleMenu } from "../../redux/actions/theme";
import Footer from "./Footer";
import Header from "./Header";
import LeftSideBar from "./LeftSideBar";
import RightSideBar from "./RightSideBar";
export default function MainLayout({ children, footer, term }) {
  const openMenu = useSelector((state) => state.theme.openMenu);
  const media = useSelector((state) => state.theme.media);
  const dispatch = useDispatch();
  useEffect(() => {
    const handleWidth = () => {
      if (window.innerWidth < 1250 && media !== "sm") {
        console.log("sm");
        dispatch(setMediaWidth("sm"));
        dispatch(toggleMenu(false));
      }
      if (window.innerWidth >= 1250 && media !== "lg") {
        console.log("lg");
        dispatch(setMediaWidth("lg"));
      }
    };

    "load resize".split(" ").map((m) => {
      window.addEventListener(m, handleWidth);
    });
    return () => {
      "load resize".split(" ").map((m) => {
        window.removeEventListener(m, handleWidth);
      });
    };
  }, [media, dispatch]);

  return (
    <>
      <Header />
      <div id="body">
        <div id="container">
          {openMenu && (
            <LeftSideBar term={term} classHtml={openMenu ? "open-menu" : ""} />
          )}
          {openMenu && media === "sm" && (
            <div
              className="overlay"
              onClick={() => {
                dispatch(toggleMenu(false));
              }}
            ></div>
          )}
          <div id="page" className={!openMenu && media === "lg" ? "type2" : ""}>
            <div className="clearfix">
              <div className="main-wrap">{children}</div>
              <RightSideBar />
            </div>
          </div>
        </div>
      </div>
      <Footer {...footer} />
    </>
  );
}
