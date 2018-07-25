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
        { event_id: 1, division_id: 3, rider_id: 1, run_1: '93', run_2: '88', run_3: '90', final: '1' }
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

  describe('getRider', () => {
    let wrapper;
    beforeEach(() => {
      const mockResults = [
        { event_id: 1, division_id: 3, rider_id: 1, run_1: '93', run_2: '88', run_3: '90', final: '1' }
      ];
      wrapper = shallow(<Events
        results={mockResults}
      />, { disableLifecycleMethods: true });
    });

    it('should call fetch with the correct arguments', async () => {
      const expectedUrl = 'https://leaderboard-byob.herokuapp.com/api/v1/riders/23';
      const spy = jest.spyOn(window, 'fetch');

      await wrapper.instance().getRider(23);
      expect(spy).toHaveBeenCalledWith(expectedUrl);
    });

    it('should return the correct rider data', async () => {
      const expected = [{
        country: "CAN",
        gender: "womens",
        id: 23,
        img: "https://stillimg.olympic.org/flags/1x1/340x340/can.png?interpolation=lanczos-none&resize=45:45",
        name: "Calynn IRWIN"
      }];

      const result = await wrapper.instance().getRider(23);
      expect(result).toEqual(expected);
    });
  });

  describe('storeNewResult', () => {
    let wrapper;
    beforeEach(() => {
      const mockResults = [
        { event_id: 1, division_id: 3, rider_id: 1, run_1: '93', run_2: '88', run_3: '90', final: '1' }
      ];
      const mockUpdateResults = jest.fn();
      wrapper = shallow(<Events
        results={mockResults}
        updateResults={mockUpdateResults}
      />, { disableLifecycleMethods: true });
    });

    it('should call changeScore', () => {
      wrapper.changeScore = jest.fn;
      const mockResult = {
        rider_id: 25,
        event_id: 1,
        division_id: 8,
        run_1: 96,
        run_2: 97,
        run_3: 95
      };
      const spy = jest.spyOn(wrapper.instance(), 'changeScore');

      wrapper.instance().storeNewResult(mockResult);
      expect(spy).toHaveBeenCalled();
    });

    it('should call orderResults', () => {
      wrapper.changeScore = jest.fn;
      const mockResult = {
        rider_id: 25,
        event_id: 1,
        division_id: 8,
        run_1: 96,
        run_2: 97,
        run_3: 95
      };
      const spy = jest.spyOn(wrapper.instance(), 'orderResults');

      wrapper.instance().storeNewResult(mockResult);
      expect(spy).toHaveBeenCalled();
    });

    it('should call updateResults', () => {
      wrapper.changeScore = jest.fn;
      const mockResult = {
        rider_id: 25,
        event_id: 1,
        division_id: 8,
        run_1: 96,
        run_2: 97,
        run_3: 95
      };
      const spy = jest.spyOn(wrapper.instance().props, 'updateResults');

      wrapper.instance().storeNewResult(mockResult);
      expect(spy).toHaveBeenCalled();
    });

    it('should not do anything if the result does not have a value', () => {
      wrapper.changeScore = jest.fn;
      const mockResult = '';
      const spy1 = jest.spyOn(wrapper.instance(), 'changeScore');
      const spy2 = jest.spyOn(wrapper.instance().props, 'updateResults');
      const spy3 = jest.spyOn(wrapper.instance(), 'orderResults');

      wrapper.instance().storeNewResult(mockResult);
      expect(spy1).not.toHaveBeenCalled();
      expect(spy2).not.toHaveBeenCalled();
      expect(spy3).not.toHaveBeenCalled();
    });
  });

  describe('orderResults', () => {
    let wrapper;
    beforeEach(() => {
      const mockResults = [
        { event_id: 1, division_id: 3, rider_id: 1, run_1: '93', run_2: '88', run_3: '90', final: '1' }
      ];
      wrapper = shallow(<Events
        results={mockResults}
      />, { disableLifecycleMethods: true });
    });

    it('should order the results from largest to smallest final score with three run values', () => {
      const initialResults = [
        { run_1: 90, run_2: 90, run_3: 90, final: 0 },
        { run_1: 95, run_2: 95, run_3: 95, final: 0 },
        { run_1: 92, run_2: 92, run_3: 92, final: 0 }
      ];
      const expected = [
        { run_1: 95, run_2: 95, run_3: 95, final: 95 },
        { run_1: 92, run_2: 92, run_3: 92, final: 92 },
        { run_1: 90, run_2: 90, run_3: 90, final: 90 }
      ];

      const result = wrapper.instance().orderResults(initialResults);
      expect(result).toEqual(expected)
    });

    it('should order the results from largest to smallest final score with two run values', () => {
      const initialResults = [
        { run_1: 90, run_2: 90, run_3: 0, final: 0 },
        { run_1: 95, run_2: 95, run_3: 0, final: 0 },
        { run_1: 92, run_2: 92, run_3: 0, final: 0 }
      ];
      const expected = [
        { run_1: 95, run_2: 95, run_3: 0, final: 95 },
        { run_1: 92, run_2: 92, run_3: 0, final: 92 },
        { run_1: 90, run_2: 90, run_3: 0, final: 90 }
      ];

      const result = wrapper.instance().orderResults(initialResults);
      expect(result).toEqual(expected)
    });

    it('should order the results from largest to smallest final score with only one run value', () => {
      const initialResults = [
        { run_1: 90, run_2: 0, run_3: 0, final: 0 },
        { run_1: 95, run_2: 0, run_3: 0, final: 0 },
        { run_1: 92, run_2: 0, run_3: 0, final: 0 }
      ];
      const expected = [
        { run_1: 95, run_2: 0, run_3: 0, final: 95 },
        { run_1: 92, run_2: 0, run_3: 0, final: 92 },
        { run_1: 90, run_2: 0, run_3: 0, final: 90 }
      ];

      const result = wrapper.instance().orderResults(initialResults);
      expect(result).toEqual(expected)
    });
  });

  describe('changeScore', () => {
    let wrapper;
    beforeEach(() => {
      const mockResults = [
        { event_id: 1, division_id: 3, rider_id: 1, run_1: '93', run_2: '88', run_3: '90', final: '1' }
      ];
      wrapper = shallow(<Events
        results={mockResults}
      />, { disableLifecycleMethods: true });
    });

    it('should return an array with updated results', () => {
      const mockResult = {
        rider_id: 1,
        event_id: 1,
        division_id: 3,
        run_1: 96
      }
      const expected = { 
        event_id: 1, 
        division_id: 3, 
        rider_id: 1, 
        run_1: 96, 
        run_2: '88', 
        run_3: '90', 
        final: '1' 
      }

      const result = wrapper.instance().changeScore(mockResult)
      expect(result[0]).toEqual(expected)
    });

    it('should be able to change any result', () => {
      const mockResult = {
        rider_id: 1,
        event_id: 1,
        division_id: 3,
        run_3: 96
      }
      const expected = {
        event_id: 1,
        division_id: 3,
        rider_id: 1,
        run_1: '93',
        run_2: '88',
        run_3: 96,
        final: '1'
      }

      const result = wrapper.instance().changeScore(mockResult)
      expect(result[0]).toEqual(expected)
    });

    it('should not change a result if there is not an exact match', () => {
      const mockResult = {
        rider_id: 2,
        event_id: 1,
        division_id: 3,
        run_3: 96
      }
      const expected = {
        event_id: 1,
        division_id: 3,
        rider_id: 1,
        run_1: '93',
        run_2: '88',
        run_3: '90',
        final: '1'
      }

      const result = wrapper.instance().changeScore(mockResult)
      expect(result[0]).toEqual(expected)
    });
  });




});