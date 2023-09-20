import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../features/userDeailSlice';

const MyVerticallyCenteredModal = () => {
  const { modal, users } = useSelector((state) => state.app)

  const userDetail = users.find((obj) => {
    if (obj.id == modal.id) return obj
  })

  const dispatch = useDispatch()
  const modalCloseHandler = () => {
    dispatch(closeModal())
  }

  if(userDetail === undefined) return;
  return (
    <Modal
      // show attribute value true or false decide modal is open or not
      show={modal.open}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header onClick={modalCloseHandler} closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {userDetail.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{ userDetail.email  }</h4>
        <h3>
          Gander : {userDetail.gender }
        </h3>
        <h3>
          Age : {userDetail.age }
        </h3>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={modalCloseHandler}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}



export default MyVerticallyCenteredModal;