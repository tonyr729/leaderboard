import { ridersReducer } from "./ridersReducer";

describe('ridersReducer', () => {
  let mockRiders;
  let mockState;

  beforeEach(() => {
    mockRiders = [
      { 
        id: 1,
        name: "Chloe KIM",
        gender: "womens",
        img: "https://stillimg.olympic.org/flags/1x1/340x340/usa.png?interpolation=lanczos-none&resize=45:45",
        country: "USA"
      },
      { 
        id: 2,
        name: "Jiayu LIU",
        gender: "womens",
        img: "https://stillimg.olympic.org/flags/1x1/340x340/chn.png?interpolation=lanczos-none&resize=45:45",
        country: "CHN"
      }
    ];
    mockState = [];
  });

  it('should return an array of riders when given an action with the type of ADD_RIDERS', () => {
    const expected = mockRiders;
    const mockAction = {
      type: 'ADD_RIDERS',
      riders: mockRiders,
      fakeStuff: 'Fake stuff here for testing.'
    };

    const result = ridersReducer(mockState, mockAction);

    expect(result).toEqual(expected);
  });


  it('should return the state when given an action with a type that is not found', () => {
    const mockState = [{ fake: 'state' }];
    const mockAction = { type: 'DELETE_RIDER' };
    const result = ridersReducer(mockState, mockAction);

    expect(result).toEqual(mockState);
  });

  it('should have an empty array as a default state', () => {
    const mockActivity = { type: 'REMOVE_RIDER' };
    const result = ridersReducer(undefined, mockActivity);

    expect(result).toEqual([]);
  });
});