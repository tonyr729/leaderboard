import React from "react";
import { shallow } from "enzyme";
import { Admin, mapDispatchToProps, mapStateToProps } from "./Admin";

describe('Admin', () => {
  let wrapper;
  beforeEach(() => {
    const mockRiders = [
      { id: 1, name: 'tony', gender: 'male', image: 'awesome.jpg', country: 'USA' }
    ];
    const mockResults = [
      { event_id: 1, division_id: 3, rider_id: 1, run_1: '93', run_2: '88', run_3: '90', final: '1' },
      { event_id: 1, division_id: 3, rider_id: 2, run_1: '90', run_2: '93', run_3: '88', final: '2' }
    ];
    wrapper = shallow(<Admin riders={mockRiders} results={mockResults} />, { disableLifecycleMethods: true });
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('getRiders', () => {
    let wrapper;
    beforeEach(() => {
      const mockRiders = [
        { id: 1, name: 'tony', gender: 'male', image: 'awesome.jpg', country: 'USA' }
      ];
      const mockAddAllRiders = jest.fn();
      wrapper = shallow(<Admin 
        addAllRiders={mockAddAllRiders}
        riders={mockRiders}
      />, { disableLifecycleMethods: true });
    });

    it('should call fetch with the correct arguments', async () => {
      const expectedUrl = 'https://leaderboard-byob.herokuapp.com/api/v1/riders';
      const spy = jest.spyOn(window, 'fetch');

      await wrapper.instance().getRiders();
      expect(spy).toHaveBeenCalledWith(expectedUrl);
    });

    it('should call addAllRiders', async () => {
      wrapper.addAllRiders = jest.fn();
      const spy = jest.spyOn(wrapper.instance().props, 'addAllRiders');

      await wrapper.instance().getRiders();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('storeNewResult', () => {
    let wrapper;
    beforeEach(() => {
      const mockRiders = [
        { id: 1, name: 'tony', gender: 'male', image: 'awesome.jpg', country: 'USA' }
      ];
      const mockResults = [
        { event_id: 1, division_id: 3, rider_id: 1, run_1: '93', run_2: '88', run_3: '90', final: '1' }
      ];
      wrapper = shallow(<Admin
        riders={mockRiders}
        results={mockResults}
      />, { disableLifecycleMethods: true });
    });

    it('should call fetch with the correct arguments', async () => {
      const mockResults = { event_id: 1, division_id: 3, rider_id: 1, run_1: '93', run_2: '88', run_3: '90', final: '1' };
      const expectedUrl = 'https://leaderboard-byob.herokuapp.com/api/v1/events/1/divisions/3/riders/1';
      const expectedBody = {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({result: mockResults})
      }
      const spy = jest.spyOn(window, 'fetch');

      await wrapper.instance().sendResultToDb(mockResults);
      expect(spy).toHaveBeenCalledWith(expectedUrl, expectedBody);
    });
  });

  describe('handleChange', () => {
    let mockRiders;
    let mockResults;
    let mockEvent;
    let wrapper;

    beforeEach(() => {
      mockRiders = [
        { id: 1, name: 'tony', gender: 'male', image: 'awesome.jpg', country: 'USA' }
      ];
      mockResults = [
        { event_id: 1, division_id: 3, rider_id: 1, run_1: '93', run_2: '88', run_3: '90', final: '1' }
      ];
      mockEvent = { 
        preventDefault: jest.fn(), 
        target: {
          id: 4,
          value: 90 
        }
      }
      wrapper = shallow(<Admin
        riders={mockRiders}
        results={mockResults}
        />, { disableLifecycleMethods: true });

        wrapper.setState = jest.fn()
    });

    it('should set state based off incoming event', () => {
      const spy = jest.spyOn(wrapper.instance(), 'setState');

      wrapper.instance().handleChange(mockEvent)

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('submitChanges', () => {
    let mockRiders;
    let mockResults;
    let mockState;
    let mockEvent;
    let wrapper;

    beforeEach(() => {
      mockRiders = [
        { id: 1, name: 'tony', gender: 'male', image: 'awesome.jpg', country: 'USA' }
      ];
      mockResults = [
        { event_id: 1, division_id: 3, rider_id: 1, run_1: '93', run_2: '88', run_3: '90', final: '1' }
      ];
      mockState = {
        event_id: 1,
        division_id: 8,
        rider_id: 25,
        run_1: 96,
        run_2: 97,
        run_3: 95
      };
      mockEvent = { preventDefault: jest.fn() }
      wrapper = shallow(<Admin
        riders={mockRiders}
        results={mockResults}
        />, { disableLifecycleMethods: true });
        window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
          status: 200,
          ok: true,
          json: () => Promise.resolve(mockState)
        }));
    });

    it('should call sendResultToDb', () => {
      wrapper.sendResultToDb = jest.fn();
      wrapper.setState(mockState);
      const spy = jest.spyOn(wrapper.instance(), 'sendResultToDb');
    
      wrapper.instance().submitChanges(mockEvent);
      expect(spy).toHaveBeenCalled();
    });

    it('should call sendResultToSocket', () => {
      wrapper.sendResultToSocket = jest.fn();
      wrapper.setState(mockState);
      const spy = jest.spyOn(wrapper.instance(), 'sendResultToSocket');
    
      wrapper.instance().submitChanges(mockEvent);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('mapStateToProps', () => {

    it('should map results to props', () => {
      const mockResults = { 
        name: "tony", score: 100
      };
      const mockState = {
        riders: { name: 'tony', score: 100 }
      };
      const expected = {
        riders: mockResults
      }

      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(expected);
    });
  });

  describe('mapDispatchToProps', () => {

    it('should call dispatch with the correct params on addResults', () => {
      const mockDispatch = jest.fn();
      const mappedProps = mapDispatchToProps(mockDispatch);
      const mockAction = {
        type: 'ADD_RIDERS'
      };
      mappedProps.addAllRiders();

      expect(mockDispatch).toHaveBeenCalledWith(mockAction);
    });

    it('should call dispatch with the correct params on updateResult', () => {
      const mockDispatch = jest.fn();
      const mappedProps = mapDispatchToProps(mockDispatch);
      const mockAction = {
        type: 'ADD_RIDERS'
      };

      mappedProps.addAllRiders();

      expect(mockDispatch).toHaveBeenCalledWith(mockAction);
    });

  });
});


// it('should call changeScore', () => {
//   wrapper.changeScore = jest.fn;
//   const mockResult = {
//     rider_id: 25,
//     event_id: 1,
//     division_id: 8,
//     run_1: 96,
//     run_2: 97,
//     run_3: 95
//   };
//   const spy = jest.spyOn(wrapper.instance(), 'changeScore');

//   wrapper.instance().storeNewResult(mockResult);
//   expect(spy).toHaveBeenCalled();
// });