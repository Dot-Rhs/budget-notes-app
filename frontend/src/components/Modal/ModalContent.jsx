import React, { useContext } from "react";
import GlobalContext from "../../context/context";

const ModalDeleteContent = ({ callback }) => {
  const { setModalContent } = useContext(GlobalContext);

  return (
    <div className="flex items-center flex-col justify-center">
      <p className="text-xl tracking-widest">You really wanna do this?</p>
      <span className="card-actions mt-4">
        <button
          className="btn btn-error text-base-100 tracking-wider"
          onClick={() => {
            callback();
            setModalContent((prev) => ({ ...prev, open: false }));
          }}
        >
          Delete
        </button>
        <button
          className="btn btn-ghost hover:bg-primary hover:text-base-100"
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
