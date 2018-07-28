import React from "react";
import { shallow } from "enzyme";
import SidebarFull from "./SidebarFull";

describe('SidebarFull', () => {
  it('should match the snapshot', () => {
    const wrapper = shallow(<SidebarFull />);
    expect(wrapper).toMatchSnapshot();
  });
});