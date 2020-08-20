import React from 'react';
import { shallow, mount } from 'enzyme';

import LoadingButton from './index';

describe('<LoadingButton />', () => {
  it('should render correctly', () => {
    const component = shallow(<LoadingButton />);
    expect(component).toMatchSnapshot();
  });

  it('should not call onclick function ', () => {
    const clickFn = jest.fn();

    const component = mount(<LoadingButton loading={true} onClick={() => clickFn()} />);
    component.find('button').simulate('click');
    expect(clickFn).not.toHaveBeenCalled();
    component.unmount();
  });

  it('should call onclick function', () => {
    const clickFn = jest.fn();

    const component = mount(<LoadingButton loading={false} onClick={() => clickFn()} />);
    component.find('button').simulate('click');
    expect(clickFn).toHaveBeenCalled();
    component.unmount();
  });
});