import SkeletonSmallThumbnail from "./SkeletonSmallThumbnail";
import SkeletonSmallTitle from "./SkeletonSmallTitle";
export default function SkeletonSmallItem() {
  return (
    <>
      <div className="Skeleton-small-item d-flex" style={{marginBottom: `.7rem`}}>
        <SkeletonSmallThumbnail />
        <SkeletonSmallTitle />
      </div>
    </>
  );
}
