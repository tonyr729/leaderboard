import React from "react";
import { shallow } from "enzyme";
import { Events } from "./Events";

describe('Events', () => {
  let wrapper;
  beforeEach(() => {
    const mockResults = [
      { event_id: 1, division_id: 3, rider_id: 1, run_1: '93', run_2: '88', run_3: '90', final: '1' },
      { event_id: 1, division_id: 3, rider_id: 2, run_1: '90', run_2: '93', run_3: '88', final: '2' }
    ]
    wrapper = shallow(<Events results={mockResults} />, { disableLifecycleMethods: true });
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});