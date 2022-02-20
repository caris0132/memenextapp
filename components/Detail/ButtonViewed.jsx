import DetailStyles from "../../styles/Detail.module.scss";
export default function ButtonViewed({view}) {
  return (
    <div className={DetailStyles['btn-en'] + ` position-relative mt-3`} title="Luợt xem 9">
      <svg
        className={DetailStyles['icon-en']}
        fill="currentColor"
        width="1em"
        height="1em"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 576 512"
      >
        <path d="M288 288a64 64 0 0 0 0-128c-1 0-1.88.24-2.85.29a47.5 47.5 0 0 1-60.86 60.86c0 1-.29 1.88-.29 2.85a64 64 0 0 0 64 64zm284.52-46.6C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 96a128 128 0 1 1-128 128A128.14 128.14 0 0 1 288 96zm0 320c-107.36 0-205.46-61.31-256-160a294.78 294.78 0 0 1 129.78-129.33C140.91 153.69 128 187.17 128 224a160 160 0 0 0 320 0c0-36.83-12.91-70.31-33.78-97.33A294.78 294.78 0 0 1 544 256c-50.53 98.69-148.64 160-256 160z"></path>
      </svg>
      
      <span className={DetailStyles['text-en'] + ` d-block`}>{view}</span>
    </div>
  );
}