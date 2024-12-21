import React from "react";
import "./style.css";
import Button from "../../Components/Buttons/Button";
import Modal from "react-bootstrap/Modal";
import { faEdit, faClose } from "@fortawesome/free-solid-svg-icons";
function UpdatePostModal({ showModal, handleCloseModal, currentPost, handleChangeData, handleUpdatePost }) {
  return (
    <>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentPost.id} - {currentPost.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="edit-post-form">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Title"
              value={currentPost.title}
              onChange={(e) => {
                handleChangeData({ ...currentPost, title: e.target.value });
              }}
            />
            <textarea
              className="form-control mb-2"
              placeholder="Body"
              rows="4"
              value={currentPost.body}
              onChange={(e) => {
                handleChangeData({ ...currentPost, body: e.target.value });
              }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer className="modalFooter">
          <Button
            color="secondary"
            icon={faClose}
            text="Close"
            onClick={handleCloseModal}
          />
          <Button
            color="primary"
            icon={faEdit}
            text="Update"
            onClick={handleUpdatePost}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdatePostModal;
