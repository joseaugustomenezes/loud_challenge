import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

import LoadingButton from '../../components/LoadingButton';
import Toast from "../../components/Toast";
import { login } from "../../store/actions";

const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  return (
    <div style={{ possition: "relative" }}>
      <Toast message={user?.error?.message} status={user?.error?.status} />
      <Container>
        <h1>Login</h1>
        <hr />
        <Formik
          initialValues={{ email: "", username: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.username) errors.username = "Campo obrigatório";
            if (!values.password) errors.password = "Campo obrigatório";
            return errors;
          }}
          onSubmit={(values) => {
            dispatch(login(values));
          }}
        >
          {({
            values,
            handleSubmit,
            handleChange,
            handleBlur,
            touched,
            errors,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Usuário</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Insira o usuário"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                  isInvalid={touched.username && errors.username}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>Senha</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  ogin
                  id="password"
                  placeholder="Insira a senha"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  isInvalid={touched.password && errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
              <LoadingButton loading={user?.loading} type="submit">Entrar</LoadingButton>
              <span> ou </span>
              <Link to="/signup">Cadastar</Link>
            </Form>
          )}
        </Formik>
      </Container>
    </div>
  );
};

export default Login;
