import { resultsReducer } from "./resultsReducer";

describe('resultsReducer', () => {
  let mockResults;
  let mockState;

  beforeEach(() => {
    mockResults = [
      {
        id: 26,
        event_id: 1,
        division_id: 8,
        rider_id: 26,
        run_1: "100",
        run_2: "100",
        run_3: "99",
        final: 99.6,
        name: "Ayumu HIRANO",
        image: "https://stillimg.olympic.org/flags/1x1/340x340/jpn.png?interpolation=lanczos-none&resize=45:45"
      },
      { 
        id: 30,
        event_id: 1,
        division_id: 8,
        rider_id: 30,
        run_1: "80",
        run_2: "100",
        run_3: "99",
        final: 93,
        name: "Chase JOSEY",
        image: "https://stillimg.olympic.org/flags/1x1/340x340/usa.png?interpolation=lanczos-none&resize=45:45"
      }
    ];
    mockState = [];
  });

  it('should return an array of results when given an action with the type of ADD_RESULTS', () => {
    const expected = mockResults;
    const mockAction = {
      type: 'ADD_RESULTS',
      results: mockResults,
      fakeStuff: 'Fake stuff here for testing.'
    };

    const result = resultsReducer(mockState, mockAction);

    expect(result).toEqual(expected);
  });

  it('should return an array of results when given an action with the type of UPDATE_RESULTS', () => {
    const expected = mockResults;
    const mockAction = {
      type: 'UPDATE_RESULT',
      results: mockResults,
      testStuff: 'Just here to make the test more legit.'
    }

    const result = resultsReducer(mockState, mockAction);

    expect(result).toEqual(expected);
  });

  it('should return the state when given an action with a type that is not found', () => {
    const mockState = [{ fake: 'state' }];
    const mockAction = { type: 'DELETE_RESULTS' };
    const result = resultsReducer(mockState, mockAction);

    expect(result).toEqual(mockState);
  });

  it('should have an empty array as a default state', () => {
    const mockActivity = { type: 'REMOVE_USER' };
    const result = resultsReducer(undefined, mockActivity);

    expect(result).toEqual([]);
  });
});