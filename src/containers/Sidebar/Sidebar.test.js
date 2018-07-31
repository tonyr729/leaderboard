import React from "react";
import { shallow } from "enzyme";
import Sidebar from "./Sidebar";

describe('Sidebar', () => {
  it('should match the snapshot', () => {
    const wrapper = shallow(<Sidebar />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a default collapsed value of false in state', () => {
    const wrapper = shallow(<Sidebar />);
    expect(wrapper.state('collapsed')).toEqual(false)
  });

  it('should call toggleSidebar when the button is clicked', () => {
    const wrapper = shallow(<Sidebar />);
    const spy = jest.spyOn(wrapper.instance(), 'toggleSidebar');
    
    wrapper.find('.icon-left-dir').simulate('click');
    expect(spy).toHaveBeenCalled()
  });

  describe('toggleSidebar', () => {
    it('should change the value of collapsed in state to the opposite value', () => {
      const wrapper = shallow(<Sidebar />);
      wrapper.instance().toggleSidebar();
      expect(wrapper.state('collapsed')).toEqual(true)
    });
  });
});