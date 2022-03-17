/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React, { useEffect, useState } from "react";
export default function DropZone({
  innerRef,
  onChange,
  sendSuccess,
  setSendSuccess,
  errors
}) {
  console.log(`dropzone errors = `, errors);
  const [preview, setPreview] = useState();
  const handlePreviewImg = (e) => {
    const file = e.target.files[0];
    if (e.target.files.length) {
      setPreview(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    if (sendSuccess && preview) {
      URL.revokeObjectURL(preview);
      setPreview(undefined);
      setSendSuccess(false);
    }
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview, sendSuccess]);
  useEffect(() => {
    const dropZone = document.getElementById(`file_upload`);
    const dropZoneElement = dropZone.closest(".drop-zone");

    dropZoneElement.addEventListener("click", (e) => {
      dropZone.click();
    });

    dropZone.addEventListener("change", (e) => {});

    dropZoneElement.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropZoneElement.classList.add("drop-zone--over");
    });

    ["dragleave", "dragend"].forEach((type) => {
      dropZoneElement.addEventListener(type, (e) => {
        dropZoneElement.classList.remove("drop-zone--over");
      });
    });

    dropZoneElement.addEventListener("drop", (e) => {
      e.preventDefault();

      if (e.dataTransfer.files.length) {
        dropZone.files = e.dataTransfer.files;
      }

      dropZoneElement.classList.remove("drop-zone--over");
    });
  }, []);
  return (
    <div className="drop-zone">
      {typeof preview === "undefined" ? (
        <span className="drop-zone__prompt">
          <Image
            src="/images/file-upload.svg"
            alt="Upload"
            width={50}
            height={60}
            className="image-center d-block"
          />
          <span className="d-block mb-3 mt-2">Kéo thả hình ảnh hoặc </span>
          <span className="btn btn-primary btn-sm pb-2 pe-3 ps-3 pt-2">
            <strong>Chọn tệp tin</strong>
          </span>
        </span>
      ) : (
        <img src={preview} alt="Preview" className="img-responsive" />
      )}
      <input
        type="file"
        name="file"
        className="drop-zone__input"
        onChange={(e) => {
          handlePreviewImg(e), onChange(e);
        }}
        id="file_upload"
        ref={innerRef}
      />
    </div>
  );
}
