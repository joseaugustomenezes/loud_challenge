import React from "react";
import { mount } from "enzyme";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

import CreateModal from "./index";

describe("<CreateModal />", () => {
  it("should render without errors", () => {
    const mockStore = configureStore();

    const component = mount(
      <Provider store={mockStore({})}>
        <CreateModal />
      </Provider>
    );
    expect(component).toMatchSnapshot();
    component.unmount();
  });

  it("should be visible when prop visible is set to true", () => {
    const mockStore = configureStore();

    const component = mount(
      <Provider store={mockStore({})}>
        <CreateModal visible={true} />
      </Provider>
    );
    expect(component.find("Modal").at(0).prop("show")).toBeTruthy();
    component.unmount();
  });

  it("should call onClose", () => {
    const mockFn = jest.fn();
    const mockStore = configureStore();
    const component = mount(
      <Provider store={mockStore({})}>
        <CreateModal visible={true} onClose={() => mockFn()} />
      </Provider>
    );
    component.find(".close").simulate("click");
    expect(mockFn).toHaveBeenCalled();
    component.unmount();
  });

  it("should validate empty inputs", async () => {
    const mockStore = configureStore();
    const component = mount(
      <Provider store={mockStore({})}>
        <CreateModal visible={true} />
      </Provider>
    );
    await component.find('MyInnerForm').props().submitForm();
    expect(component.find('MyInnerForm').update().find('.invalid-feedback').at(0).contains('Campo obrigatório')).toBeTruthy();
    expect(component.find('MyInnerForm').update().find('.invalid-feedback').at(1).contains('Campo obrigatório')).toBeTruthy();
    component.unmount();
  })
});
