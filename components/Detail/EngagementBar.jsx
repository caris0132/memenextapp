import ButtonViewed from "../Detail/ButtonViewed";
import ButtonDownload from "../Detail/ButtonDownload";
import DetailStyles from "../../styles/Detail.module.scss";
export default function EngagementBar({view, download}) {
  return (
    <div
      className={
        DetailStyles["photo-detail-engagementBar"] + ` d-md-block d-none`
      }
    >
      <div className={DetailStyles["engagementBar-sticky"]}>
        <ButtonDownload download={download}/>
        <ButtonViewed view={view}/>
      </div>
    </div>
  );
}
