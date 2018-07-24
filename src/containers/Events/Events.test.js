import React from "react";
import { shallow } from "enzyme";
import { Events } from "./Events";

describe('Events', () => {
  let wrapper;
  beforeEach(() => {
    const mockResults = [
      { event_id: 1, division_id: 3, rider_id: 1, run_1: '93', run_2: '88', run_3: '90', final: '1' },
      { event_id: 1, division_id: 3, rider_id: 2, run_1: '90', run_2: '93', run_3: '88', final: '2' }
    ];
    wrapper = shallow(<Events results={mockResults} />, { disableLifecycleMethods: true });
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('getResults', () => {
    let wrapper;
    beforeEach(() => {
      const mockResults = [
        { event_id: 1, division_id: 3, rider_id: 1, run_1: '93', run_2: '88', run_3: '90', final: '1' },
        { event_id: 1, division_id: 3, rider_id: 2, run_1: '90', run_2: '93', run_3: '88', final: '2' }
      ];
      const mockAddAllResults = jest.fn();
      wrapper = shallow(<Events 
        addAllResults={mockAddAllResults}
        results={mockResults}
      />, { disableLifecycleMethods: true });
      wrapper.orderResults = jest.fn();
    });

    it('should call fetch with the correct arguments', async () => {
      const expectedUrl = 'https://leaderboard-byob.herokuapp.com/api/v1/events/1/division/8/results';
      const spy = jest.spyOn(window, 'fetch');

      await wrapper.instance().getResults();
      expect(spy).toHaveBeenCalledWith(expectedUrl);
    });

    it('should call getRider', async () => {
      wrapper.getRider = jest.fn();
      const spy = jest.spyOn(wrapper.instance(), 'getRider');

      await wrapper.instance().getResults();
      expect(spy).toHaveBeenCalled();
    });

    it('should call orderResults', async () => {
      wrapper.orderResults = jest.fn();
      const spy = jest.spyOn(wrapper.instance(), 'orderResults');

      await wrapper.instance().getResults();
      expect(spy).toHaveBeenCalled();
    });

    it('should call addAllResults', async () => {
      const spy = jest.spyOn(wrapper.instance().props, 'addAllResults');

      await wrapper.instance().getResults();
      expect(spy).toHaveBeenCalled();
    });
  });



});