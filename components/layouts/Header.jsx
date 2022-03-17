/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useRef } from "react";
import HeaderStyles from "../../styles/Header.module.scss";
import ModalUpload from "../Modal/ModalUpload";
import { useSelector, useDispatch } from "react-redux";
import { toggleMenu, toggleModal } from "../../redux/actions/theme";
import queryString from "query-string";

export default function Header() {
  const formSearch = useRef();
  const openMenu = useSelector((state) => state.theme.openMenu);
  const openModal = useSelector((state) => state.theme.openModal);
  const dispatch = useDispatch();
  const handleMenu = () => {
    const action = toggleMenu(!openMenu);
    dispatch(action);
  };
  const handleModal = () => {
    const action = toggleModal(!openModal);
    dispatch(action);
  };
  const handleOpenFormSearch = (e) => {
    e.preventDefault();
    const f = formSearch.current;
    f.classList.toggle(HeaderStyles["open-form-search"]);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    let val = e.target.keyword.value;
    if (val) {
      const APP_URL = process.env.NEXT_PUBLIC_APP_URL;
      const url = queryString.stringifyUrl({
        url: `${APP_URL}/tim-kiem`,
        query: { keyword: val },
      });
      window.location.href = url;
    }
  };
  return (
    <>
      <header className={HeaderStyles.header}>
        <div className="wrapper">
          <div className="d-flex align-items-center justify-content-between">
            <div className={HeaderStyles["header-left"]}>
              <div className="d-flex align-items-center">
                <button
                  type="button"
                  className={HeaderStyles["btn-menu"]}
                  onClick={handleMenu}
                ></button>
                <div
                  className={HeaderStyles["main-logo"] + ` position-relative`}
                >
                  <Link href="/">
                    <a className="full"></a>
                  </Link>
                  <div className={HeaderStyles["logo-svg"]}>
                    <img
                      src="/images/memevui.svg"
                      width={40}
                      height={40}
                      alt="Logo memevui"
                    />
                  </div>
                  <div className={HeaderStyles["logo-text"]}>Meme Vui</div>
                </div>
                <div
                  className={HeaderStyles["block-form-search"]}
                  ref={formSearch}
                >
                  <form
                    action=""
                    method="GET"
                    className={HeaderStyles["form-search"]}
                    onSubmit={handleSearch}
                  >
                    <button
                      type="submit"
                      className={HeaderStyles["btn-search"]}
                    >
                      <img
                        src="/images/button-search.svg"
                        alt="Button search"
                      />
                    </button>
                    <input
                      type="text"
                      name="keyword"
                      placeholder="Tìm kiếm ảnh"
                      className={HeaderStyles["txt-search"]}
                    />
                  </form>
                </div>
              </div>
            </div>
            <div className={HeaderStyles["sub-menu-right"]}>
              <ul className={HeaderStyles["nav-right"]}>
                <li className="d-sm-none d-block">
                  <button
                    className={HeaderStyles["btn-open-search-m"]}
                    onClick={handleOpenFormSearch}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                    >
                      <path d="M508.5 481.6l-129-129c-2.3-2.3-5.3-3.5-8.5-3.5h-10.3C395 312 416 262.5 416 208 416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c54.5 0 104-21 141.1-55.2V371c0 3.2 1.3 6.2 3.5 8.5l129 129c4.7 4.7 12.3 4.7 17 0l9.9-9.9c4.7-4.7 4.7-12.3 0-17zM208 384c-97.3 0-176-78.7-176-176S110.7 32 208 32s176 78.7 176 176-78.7 176-176 176z"></path>
                    </svg>
                  </button>
                </li>
                <li>
                  <button
                    className={HeaderStyles["btn-open-modal"]}
                    onClick={handleModal}
                  >
                    <span className="text d-none d-sm-block">Gửi meme</span>
                    <span className="text2 d-block d-sm-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                        fill="currentColor"
                        width="1em"
                        height="1em"
                      >
                        <path d="M368 224H224V80c0-8.84-7.16-16-16-16h-32c-8.84 0-16 7.16-16 16v144H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h144v144c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V288h144c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z" />
                      </svg>
                    </span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
      {openModal && <ModalUpload />}
    </>
  );
}
