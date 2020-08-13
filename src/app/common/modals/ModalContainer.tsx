import React, { useContext } from "react";
import { Modal } from "semantic-ui-react";
import { RootStoreContext } from "../../stores/rootStore";
import { observer } from "mobx-react-lite";

const ModalContainer = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    modal: { open, body },
    closeModal,
    size,
  } = rootStore.modalStore;
  return (
    <Modal open={open} onClose={closeModal} size={size}>
      <Modal.Content>{body}</Modal.Content>
    </Modal>
  );
};

export default observer(ModalContainer);
