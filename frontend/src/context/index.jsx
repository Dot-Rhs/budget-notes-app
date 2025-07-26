import { useState } from "react";
import GlobalContext from "./context";
import Modal from "../components/Modal";

const GlobalState = ({ children }) => {
  const [modalContent, setModalContent] = useState({
    open: false,
    id: "modal",
    header: "Default Header",
    body: <div>Default Body</div>,
    footer: null,
    closeModal: () => setModalContent((prev) => ({ ...prev, open: false })),
  });

  return (
    <GlobalContext.Provider value={{ modalContent, setModalContent }}>
      {children}
      <Modal {...modalContent} />
    </GlobalContext.Provider>
  );
};

export default GlobalState;
