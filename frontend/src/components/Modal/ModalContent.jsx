import React, { useContext } from "react";
import GlobalContext from "../../context/context";

const ModalDeleteContent = ({ callback }) => {
  const { setModalContent } = useContext(GlobalContext);

  return (
    <div className="flex items-center flex-col justify-center">
      <p className="text-xl">You really wanna do this?</p>
      <span className="card-actions mt-4">
        <button
          className="btn btn-error btn-square min-w-40 rounded-none "
          onClick={() => {
            callback();
            setModalContent((prev) => ({ ...prev, open: false }));
          }}
        >
          Delete
        </button>
        <button
          className="btn btn-primary bg-current/95"
          onClick={() => {
            setModalContent((prev) => ({ ...prev, open: false }));
          }}
        >
          Cancel
        </button>
      </span>
    </div>
  );
};

export default ModalDeleteContent;
