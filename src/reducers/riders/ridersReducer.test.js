import { ridersReducer } from "./ridersReducer";

describe('ridersReducer', () => {
  let mockResults;
  let mockState;

  beforeEach(() => {
    mockRiders = [
      { event_id: 1, division_id: 3, rider_id: 1, run_1: '93', run_2: '88', run_3: '90'},
      { event_id: 1, division_id: 3, rider_id: 2, run_1: '90', run_2: '93', run_3: '88'}
    ];
    mockState = [];
  });

  it('should return an array of results when given an action with the type of ADD_RIDERS', () => {
    const expected = mockResults;
    const mockAction = {
      type: 'ADD_RESULTS',
      results: mockResults,
      fakeStuff: 'Fake stuff here for testing.'
    };

    const result = ridersReducer(mockState, mockAction);

    expect(result).toEqual(expected);
  });

  it('should return an array of results when given an action with the type of UPDATE_RESULTS', () => {
    const expected = mockResults;
    const mockAction = {
      type: 'UPDATE_RESULT',
      results: mockResults,
      testStuff: 'Just here to make the test more legit.'
    }

    const result = ridersReducer(mockState, mockAction);

    expect(result).toEqual(expected);
  });

  it('should return the state when given an action with a type that is not found', () => {
    const mockState = [{ fake: 'state' }];
    const mockAction = { type: 'DELETE_RESULTS' };
    const result = ridersReducer(mockState, mockAction);

    expect(result).toEqual(mockState);
  });

  it('should have an empty array as a default state', () => {
    const mockActivity = { type: 'REMOVE_USER' };
    const result = ridersReducer(undefined, mockActivity);

    expect(result).toEqual([]);
  });
});