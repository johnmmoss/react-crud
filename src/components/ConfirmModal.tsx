import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ConfirmModal = (props: any) => {

  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="danger" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>{props.title}</ModalHeader>
        <ModalBody>
          {props.text}
        </ModalBody>
        <ModalFooter>
          <Button color="danger" 
            onClick={() => {toggle(); props.onConfirm();}}>
              {props.confirmButtonLabel}  
            </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
            </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ConfirmModal;