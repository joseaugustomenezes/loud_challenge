import React from "react";
import { mount } from "enzyme";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import Register from "./index";

describe("<Register />", () => {
  it("should render without any errors", () => {
    const mockStore = configureStore();
    const component = mount(
      <Router>
        <Provider store={mockStore({})}>
          <Register />
        </Provider>
      </Router>
    );
    expect(component).toMatchSnapshot();
    component.unmount();
  });

  it("testing validation errors", async () => {
    const mockStore = configureStore();
    const component = mount(
      <Router>
        <Provider store={mockStore({})}>
          <Register />
        </Provider>
      </Router>
    );
    await component.find('MyInnerForm').props().submitForm();
    expect(component.find('MyInnerForm').update().find('.invalid-feedback').at(0).contains('Campo obrigatório')).toBeTruthy();
    expect(component.find('MyInnerForm').update().find('.invalid-feedback').at(1).contains('Campo obrigatório')).toBeTruthy();
    expect(component.find('MyInnerForm').update().find('.invalid-feedback').at(1).contains('Campo obrigatório')).toBeTruthy();
    await component.find('MyInnerForm').props().setFieldValue('email', "a");
    await component.find('MyInnerForm').props().setFieldValue('username', "a");
    await component.find('MyInnerForm').props().setFieldValue('password', "a");
    expect(component.find('MyInnerForm').update().find('.invalid-feedback').at(0).contains('Formato de Email inválido')).toBeTruthy();
    expect(component.find('MyInnerForm').update().find('.invalid-feedback').at(1).contains('O nome de usuário deve possuir no mínimo 3 caracteres')).toBeTruthy();
    expect(component.find('MyInnerForm').update().find('.invalid-feedback').at(2).contains('A senha deve possuir no mínimo 8 caracteres')).toBeTruthy();
    await component.find('MyInnerForm').props().setFieldValue('username', "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    await component.find('MyInnerForm').props().setFieldValue('password', "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    expect(component.find('MyInnerForm').update().find('.invalid-feedback').at(1).contains('O nome de usuário deve possuir no máximo 30 caracteres')).toBeTruthy();
    expect(component.find('MyInnerForm').update().find('.invalid-feedback').at(2).contains('A senha deve possuir no máximo 30 caracteres')).toBeTruthy();

    component.unmount();
  });
});
