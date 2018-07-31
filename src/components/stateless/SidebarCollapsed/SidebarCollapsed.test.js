import React from "react";
import { shallow } from "enzyme";
import SidebarCollapsed from "./SidebarCollapsed";

describe('SidebarCollapsed', () => {
  it('should match the snapshot', () => {
    const wrapper = shallow(<SidebarCollapsed />);
    expect(wrapper).toMatchSnapshot();
  });
});