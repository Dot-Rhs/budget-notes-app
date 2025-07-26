import { useState } from "react";
import GlobalContext from "./context";
import Modal from "../components/Modal";

const GlobalState = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    open: false,
    id: "modal",
    header: "Default Header",
    body: <div>Default Body</div>,
    footer: <div>Default Footer</div>,
    closeModal: () => setShowModal(false),
  });

  return (
    <GlobalContext.Provider value={{ modalContent, setModalContent }}>
      {children}
      <Modal {...modalContent} />
    </GlobalContext.Provider>
  );
};

export default GlobalState;
