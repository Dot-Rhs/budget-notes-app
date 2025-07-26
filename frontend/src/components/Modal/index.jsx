import { FC } from "react";
import "./styles.css";

const Modal = ({ open, id, header, body, footer, closeModal }) => {
  if (!open) return;

  return (
    <div
      id={id ?? "Modal"}
      className="fixed flex justify-center items-center left-0 top-0 w-screen h-screen overflow-auto bg-black/60 backdrop-blur-sm"
    >
      <div className="card relative bg-base-100 p-0 w-3/4 animate-modal shadow-lg">
        {header && (
          <div className="py-2 px-8 text-base-100 bg-error rounded-t-xl tracking-wider">
            <span
              className="absolute cursor-pointer text-4xl font-bold -top-1 right-2.5"
              onClick={closeModal}
            >
              &times;
            </span>
            <h2>{header}</h2>
          </div>
        )}
        <div className="body">{body}</div>
        {footer && <div className="footer">{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
