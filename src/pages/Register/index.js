import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import { Link } from 'react-router-dom';

import LoadingButton from '../../components/LoadingButton';
import { registerUser } from "../../store/actions";

const Register = () => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.register?.loading);

  return (
    <Container>
      <h1>Cadastro de Usuários</h1>
      <hr/>
      <Formik
        initialValues={{ email: "", username: "", password: "" }}
        validate={(values) => {
          const errors = {};
          const requiredFieldError = "Campo obrigatório";
          if (!values.email) errors.email = requiredFieldError;
          else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) errors.email = "Formato de Email inválido"
          if (!values.username) errors.username = requiredFieldError;
          else if(values.username.length < 3) errors.username = "O nome de usuário deve possuir no mínimo 3 caracteres";
          else if(values.username.length > 30) errors.username = "O nome de usuário deve possuir no máximo 30 caracteres";
          if (!values.password) errors.password = requiredFieldError;
          else if(values.password.length < 8) errors.password = "A senha deve possuir no mínimo 8 caracteres";
          else if(values.password.length > 30) errors.password = "A senha deve possuir no máximo 30 caracteres";
          return errors;
        }}
        onSubmit={(values) => {
          dispatch(registerUser(values));
        }}
      >
        {({ values, handleSubmit, handleChange, handleBlur, touched, errors }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                id="email"
                placeholder="Insira o email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                isInvalid={touched.email && errors.email}
              />
              <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
            </Form.Group>
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
            <LoadingButton loading={loading} type="submit">Cadastrar</LoadingButton>
            <span> ou </span>
            <Link to="/login">Entrar</Link>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Register;
