import { FC } from "react";
import "./styles.css";

const Modal = ({
  open,
  id,
  header = "header",
  body = <div>A BODY</div>,
  footer = <div>A FOOTER</div>,
  closeModal,
}) => {
  if (!open) return;

  return (
    <div
      id={id ?? "Modal"}
      className="fixed flex justify-center items-center z-10 left-0 top-0 w-screen h-screen overflow-auto bg-black/60 backdrop-blur-sm"
    >
      <div className="card relative bg-base-100 p-0 border-2 z-20 border-solid border-rose-500 w-3/4 animate-modal ">
        <div className="header">
          <span className="close-modal-icon" onClick={closeModal}>
            &times;
          </span>
          <h2>{header}</h2>
        </div>
        <div className="body">{body}</div>
        <div className="footer">{footer}</div>
      </div>
    </div>
  );
};

export default Modal;
