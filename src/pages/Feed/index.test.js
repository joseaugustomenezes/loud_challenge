import React from "react";
import { mount } from "enzyme";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

import Feed from "./index";

describe("<Feed />", () => {
  it("should render a card", () => {
    const mockStore = configureStore();
    const component = mount(
      <Provider
        store={mockStore({
          opinions: {
            ids: [0],
            content: {
              0: {
                content: "test_content",
                title: "test_title",
                upvotes_count: 3,
              },
            },
          },
        })}
      >
        <Feed />
      </Provider>
    );
    expect(component.find(".card")).toHaveLength(1);
    expect(component).toMatchSnapshot();
    component.unmount();
  });

  it("should open create modal on button click", () => {
    const mockStore = configureStore();
    const component = mount(
      <Provider store={mockStore({})}><Feed /></Provider>
    );
    component.find('.btn-primary').at(1).simulate('click');
    expect(component.find('CreateModal').prop('visible')).toBeTruthy();
  });

  it("should open details modal on button click", () => {
    const mockStore = configureStore();
    const component = mount(
      <Provider
        store={mockStore({
          opinions: {
            ids: [0],
            content: {
              0: {
                content: "test_content",
                title: "test_title",
                upvotes_count: 3,
              },
            },
          },
        })}
      >
        <Feed />
      </Provider>
    );
    component.find('.btn-link').simulate('click');
    expect(component.find('DetailsModal').prop('visible')).toBeTruthy();
  });
});
