import React from "react";
import Modal from "react-bootstrap/Modal";
import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";

import LoadingButton from "../../../components/LoadingButton";
import { createOpinion } from "../../../store/actions";

const CreateModal = ({ visible, onClose }) => {
  const dispatch = useDispatch();
  const opinion = useSelector((state) => state.createOpinion);

  const MyInnerForm = ({
    values,
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
    errors,
  }) => (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Título</Form.Label>
        <Form.Control
          type="text"
          name="title"
          id="title"
          placeholder="Título"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.username}
          isInvalid={touched.title && errors.title}
        />
        <Form.Control.Feedback type="invalid">
          {errors.title}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>Descrição</Form.Label>
        <Form.Control
          as="textarea"
          type="text"
          name="content"
          ogin
          id="content"
          placeholder="Descrição"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.content}
          isInvalid={touched.content && errors.content}
        />
        <Form.Control.Feedback type="invalid">
          {errors.content}
        </Form.Control.Feedback>
      </Form.Group>
      <div style={{ textAlign: "end" }}>
        <LoadingButton loading={opinion?.loading} type="submit">
          Criar
        </LoadingButton>
      </div>
    </Form>
  );

  const createOpinionForm = () => {
    return (
      <Formik
        initialValues={{ title: "", content: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.title) errors.title = "Campo obrigatório";
          if (!values.content) errors.content = "Campo obrigatório";
          return errors;
        }}
        onSubmit={(values) => {
          dispatch(createOpinion(values));
        }}
      >
        {(props) => <MyInnerForm {...props} />}
      </Formik>
    );
  };

  return (
    <Modal show={visible} onHide={() => onClose()}>
      <Modal.Header closeButton>
        <Modal.Title>Nova opinião</Modal.Title>
      </Modal.Header>
      <Modal.Body>{createOpinionForm()}</Modal.Body>
    </Modal>
  );
};

export default CreateModal;
