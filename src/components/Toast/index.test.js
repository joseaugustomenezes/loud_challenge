import React from 'react';
import { shallow, mount } from 'enzyme';

import Toast from './index';

describe('<Toast />', () => {
  describe('no props', () => {
    const container = shallow(<Toast />);

    it('no props should render without errors', () => {
      expect(container.html()).toMatchSnapshot();
    });
  })

  describe('with props', () => {
    const initialProps = {
      status: 500,
      message: 'test message'
    };
    const container = mount(<Toast {...initialProps} />);
    const clickfn = jest.fn();

    it('should render without errors', () => {
      expect(container.find('strong').prop('children')).toEqual(["Error ", 500]);
      expect(container.find('div.toast-body').prop('children')).toEqual('test message');
    });
  });
});