import React, { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import ReactMarkdown from "react-markdown";

import {
  insertUpvote,
  deleteUpvote,
  fetchOpinion,
} from "../../../store/actions";
import LoadingButton from '../../../components/LoadingButton';
import { getUserId } from "../../../services/auth";
import "./index.css";

const DetailsModal = ({ visible, onClose, opinionId }) => {
  const opinion = useSelector((state) => state.opinion);
  const dispatch = useDispatch();

  useEffect(() => {
    opinionId && dispatch(fetchOpinion(opinionId));
  }, [opinionId, dispatch]);

  useEffect(() => {
    opinion?.error && onClose();
  }, [opinion, onClose]);

  const Spin = () => (
    <div style={{ textAlign: "center" }}>
      <Spinner style={{ marginRight: "5px" }} animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );

  const getUpvoteButton = () => {
    const userId = getUserId();
    const hasVoted = opinion?.upvotes.find(
      (upvote) => upvote.user_id === userId
    );
    return hasVoted ? (
      <LoadingButton
        loading={opinion?.loadingUpvote}
        size="sm"
        onClick={() => dispatch(deleteUpvote(opinion?.id))}
        variant="danger"
      >
        Remover
      </LoadingButton>
    ) : (
      <LoadingButton
        loading={opinion?.loadingUpvote}
        size="sm"
        onClick={() => dispatch(insertUpvote(opinion?.id))}
        variant="success"
      >
        Votar
      </LoadingButton>
    );
  };

  return (
    <Modal show={visible} onHide={() => onClose()}>
      <Modal.Header closeButton>
        <Modal.Title>
          {opinion?.loading ? "Carregando..." : opinion?.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {opinion?.loading ? (
          <Spin />
        ) : (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <span
                style={{
                  marginRight: "15px",
                  color: "#28a745",
                  fontWeight: "bold",
                }}
              >
                ({opinion?.upvotes?.length || 0}) Votos
              </span>
              {getUpvoteButton()}
            </div>
            <ReactMarkdown className="markdown" source={opinion?.content} />
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default DetailsModal;
