/* eslint-disable @next/next/no-img-element */
import DetailStyles from "../../styles/Detail.module.scss";
import Image from "next/image";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { useState } from "react";
export default function Thumbnail({ thumbnail }) {
  const [openModal, setOpenModal] = useState(false);
  const handleModal = (e) => {
    e.preventDefault();
    setOpenModal(!openModal);
  };
  return (
    <>
      <div className="gallery position-relative">
        <span className={DetailStyles["icon-zoom-plus"]}>
          <Image
            src="/images/btn-zoom-plus.svg"
            alt="Button zoom plus"
            width={24}
            height={24}
          />
        </span>
        <figure className={DetailStyles["gallery-item"] + ` position-relative`}>
          <a href="#" className="full" onClick={handleModal}>
            {" "}
          </a>
          <img
            alt={thumbnail.title}
            src={thumbnail.thumbnail}
            title={thumbnail.title}
            width={thumbnail.width}
            height={thumbnail.height}
            className="img-center img-responsive"
          />
        </figure>
      </div>
      {openModal && (
        <Modal
          isOpen={true}
          toggle={handleModal}
          centered
          size="lg"
          fade={false}
          className="modal-light-box"
        >
          <ModalHeader toggle={handleModal}>
          </ModalHeader>
          <ModalBody>
            <img
              src={thumbnail.thumbnail}
              alt="thumbnail.title"
              width={thumbnail.width}
              height={thumbnail.height}
              title={thumbnail.title}
              className="img-responsive"
            />
          </ModalBody>
        </Modal>
      )}
    </>
  );
}
