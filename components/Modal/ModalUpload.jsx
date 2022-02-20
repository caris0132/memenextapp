import React, { useRef, useState, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  Row,
} from "reactstrap";
import axiosClient from "../../api/axiosClient";
import { toggleModal } from "../../redux/actions/theme";
import DropZone from "../DropZone/DropZone";
function ModalUpload() {
  const ref = useRef();
  const GG_SITE = process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE;
  const [sendSuccess, setSendSuccess] = useState(false);
  const dispatch = useDispatch();
  const openModal = useSelector((state) => state.theme.openModal);
  const handleModal = () => {
    dispatch(toggleModal(!openModal));
  };
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();
  const txt_title = register("txt_title", {
    required: "Vui lòng nhập tiêu đề",
    maxLength: {
      value: 256,
      message: `Tiêu đề tối đa 256 ký tự`,
    },
    minLength: {
      value: 10,
      message: `Tiêu đề tối thiểu 10 ký tự`,
    },
  });
  const txt_content = register("txt_content", {
    maxLength: {
      value: 5000,
      message: `Nội dung tối đa 5000 ký tự`,
    },
  });
  const file = register("file");
  const onHandleSubmit = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let bodyFormData = new FormData();
        bodyFormData.append("txt_title", data.txt_title);
        bodyFormData.append("txt_content", data.txt_content);
        bodyFormData.append("file", data.file[0]);
        bodyFormData.append("gg_recaptcha".ref);
        axiosClient
          .post("/newsletter/send-meme", bodyFormData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            if (response.success === "fail") {
              const errors = response.errors;
              for (const key in errors) {
                if (Object.hasOwnProperty.call(errors, key)) {
                  const message = errors[key];
                  setError(key, {
                    type: "manual",
                    message: message,
                  });
                }
              }
            }
            if (response.success === "success") {
              reset();
              setSendSuccess(true);
            }
          })
          .catch((error) => {
            console.log(error);
          });
        resolve();
      }, 2000);
    });
  };

  const handleCountTextLength = (e) => {
    let l = 5000 - e.target.value.length;
    document.querySelector(`.length-textarea`).innerText = l < 0 ? 0 : l;
  };
  return (
    <>
      <Modal isOpen={true} toggle={handleModal} centered size="lg">
        <ModalBody>
          <section className="section-upload">
            <div className="upload-header">
              <button
                className="btn-close btn-close-custom"
                type="button"
                aria-label="Close"
                onClick={handleModal}
              ></button>
              <strong className="d-block h3 font-weight-bold">Gửi meme</strong>
              <p>
                Hôm nay bạn có điều gì thú vị muốn chia sẻ với mọi người, hãy
                nội dung ở bên dưới !
              </p>
            </div>
            <Form
              method="POST"
              onSubmit={handleSubmit(onHandleSubmit)}
              encType="multipart/form-data"
            >
              <Row>
                <Col lg="6">
                  <FormGroup>
                    <DropZone
                      innerRef={file.ref}
                      onChange={file.onChange}
                      sendSuccess={sendSuccess}
                      setSendSuccess={setSendSuccess}
                    />
                    {errors?.file && (
                      <FormFeedback className="d-block">
                        {errors?.file?.message}
                      </FormFeedback>
                    )}
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <Input
                      type="text"
                      placeholder="Tiêu đề"
                      name="txt_title"
                      innerRef={txt_title.ref}
                      onChange={txt_title.onChange}
                      onBlur={txt_title.onBlur}
                      invalid={errors?.txt_title ? true : false}
                      className="txt_upload"
                    />
                    {errors?.txt_title && (
                      <FormFeedback>{errors?.txt_title?.message}</FormFeedback>
                    )}
                  </FormGroup>
                  <FormGroup className="position-relative">
                    <div className="custom-textarea">
                      <Input
                        type="textarea"
                        placeholder="Mô tả"
                        name="txt_content"
                        rows={7}
                        innerRef={txt_content.ref}
                        onChange={txt_content.onChange}
                        onBlur={txt_content.onBlur}
                        invalid={errors?.txt_content ? true : false}
                        className="txt_upload"
                        onKeyUp={handleCountTextLength}
                      />
                      <span className="length-textarea">
                        {!sendSuccess && 5000}
                      </span>
                    </div>
                    {errors?.txt_content && (
                      <FormFeedback className="d-block">
                        {errors?.txt_content?.message}
                      </FormFeedback>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <ReCAPTCHA sitekey={GG_SITE} ref={ref} />
                  </FormGroup>
                </Col>
                <Col xs="12" className="text-center">
                  <Button color="success" type="submit" disabled={isSubmitting}>
                    Gửi meme
                  </Button>
                </Col>
                {isSubmitting && <div className="form-loading"></div>}
              </Row>
            </Form>
          </section>
        </ModalBody>
      </Modal>
    </>
  );
}
export default ModalUpload;
