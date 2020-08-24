import React from "react";
import { mount } from "enzyme";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

import DetailsModal from "./index";

describe("<DetailsModal />", () => {
  it("should render without errors", () => {
    const mockStore = configureStore();
    const component = mount(
      <Provider store={mockStore({})}>
        <DetailsModal />
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });

  it("should be visible when prop visible is set to true", () => {
    const mockStore = configureStore();

    const component = mount(
      <Provider store={mockStore({})}>
        <DetailsModal visible={true} />
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
        <DetailsModal visible={true} onClose={() => mockFn()} />
      </Provider>
    );
    component.find(".close").simulate("click");
    expect(mockFn).toHaveBeenCalled();
    component.unmount();
  });

  it("should call onClose if there is an error", () => {
    const mockStore = configureStore();
    const mockFn = jest.fn();
    const component = mount(
      <Provider store={mockStore({ opinion: { error: {}, upvotes: [] } })}>
        <DetailsModal onClose={() => mockFn()} />
      </Provider>
    );
    expect(mockFn).toHaveBeenCalled();
  });

  it("should dispatch an action when opinionId is passed", () => {
    const mockStore = configureStore();
    const store = mockStore({});
    store.dispatch = jest.fn();
    const mockFn = jest.fn();
    const component = mount(
      <Provider store={store}>
        <DetailsModal opinionId={1} onClose={() => mockFn()} />
      </Provider>
    );
    expect(store.dispatch).toHaveBeenCalled();
  });

  it("should dispatch an action when user tries to remove vote", () => {
    const mockStore = configureStore();
    const store = mockStore({ opinion: { upvotes: [{ user_id: "teste" }] } });
    store.dispatch = jest.fn();
    localStorage.setItem("@loud-UserId", "teste");
    const mockFn = jest.fn();
    const component = mount(
      <Provider
        store={store}
      >
        <DetailsModal visible={true} onClose={() => mockFn()} />
      </Provider>
    );
    component.find('.btn-danger').simulate('click');
    expect(store.dispatch).toHaveBeenCalled();
  });

  it("should dispatch an action when user tries to vote", () => {
    const mockStore = configureStore();
    const store = mockStore({ opinion: { upvotes: [] } });
    store.dispatch = jest.fn();
    localStorage.setItem("@loud-UserId", "teste");
    const mockFn = jest.fn();
    const component = mount(
      <Provider
        store={store}
      >
        <DetailsModal visible={true} onClose={() => mockFn()} />
      </Provider>
    );
    component.find('.btn-success').simulate('click');
    expect(store.dispatch).toHaveBeenCalled();
  });
});
