import TermStyles from "../../styles/Term.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { toggleMenu } from "../../redux/actions/theme";
import _ from "lodash";
export default function TermItem({ item }) {
  const router = useRouter();
  const media = useSelector((state) => state.theme.media);
  const dispatch = useDispatch();
  const handlePermaLink = () => {
    if (media === "sm") {
      dispatch(toggleMenu(false));
    }
  };
  return (
    <>
      <style jsx>{`
        figure {
          background-image: url(${item.thumbnail});
        }
      `}</style>
      <div
        className={
          TermStyles["term-item"] +
          ` position-relative ` +
          (router.query.slug == item.slug ? TermStyles["active"] : "")
        }
      >
        <Link href={`/tag/${item.slug}`}>
          <a className="full" title={item.title} onClick={handlePermaLink}></a>
        </Link>
        <div className={TermStyles["term-content"]}>
          <figure className={TermStyles["term-image"] + ` mb-0`}></figure>
          <h4 className={TermStyles["term-title"]}>{item.title}</h4>
        </div>
      </div>
    </>
  );
}
