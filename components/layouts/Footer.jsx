import Link from "next/link";
import FooterStyles from "../../styles/Footer.module.scss";
import TheContent from "../Detail/TheContent";
export default function Footer({ footer, footer_content }) {
  return (
    <>
      <footer className={FooterStyles.footer}>
        <div className={FooterStyles["block-footer1"]}>
          <div className="wrapper">
            <div className="row justify-content-between">
              <div className={FooterStyles["footer-content"]}>
                <TheContent content={footer_content}/>
              </div>
              <div className={FooterStyles["footer-tag"]}>
                <h4>Từ khóa nổi bật</h4>
                {footer.map((item) => {
                  return (
                    <Link
                      href={`/tag/${item.category_slug}`}
                      key={`permalink_footer_${item.id}`}
                    >
                      <a className={FooterStyles["cloud-tag"]}>
                        #{item.category_title}
                      </a>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className={FooterStyles["block-footer2"] + ` text-center`}>
          <div className="wrapper">
            <div className="d-flex flex-wrap align-items-center justify-content-between">
              <h2 className={FooterStyles.copyright}>
                © Copyright 2022, All Rights Reserved
              </h2>
              <div className={FooterStyles.powered}>Powered by memevui.com</div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
