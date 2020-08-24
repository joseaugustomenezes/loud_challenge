import React from "react";
import { mount } from "enzyme";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import Login from "./index";

describe("<Login />", () => {
  it("should render without any errors", () => {
    const mockStore = configureStore();
    const component = mount(
      <Router>
        <Provider store={mockStore({})}>
          <Login />
        </Provider>
      </Router>
    );
    expect(component).toMatchSnapshot();
    component.unmount();
  });

  it("should render empty inputs", async () => {
    const mockStore = configureStore();
    const component = mount(
      <Router>
        <Provider store={mockStore({})}>
          <Login />
        </Provider>
      </Router>
    );
    await component.find('MyInnerForm').props().submitForm();
    expect(component.find('MyInnerForm').update().find('.invalid-feedback').at(0).contains('Campo obrigatório')).toBeTruthy();
    expect(component.find('MyInnerForm').update().find('.invalid-feedback').at(1).contains('Campo obrigatório')).toBeTruthy();
    component.unmount();
  });
});
