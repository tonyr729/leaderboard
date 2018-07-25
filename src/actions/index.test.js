import {
  addResults,
  updateResult,
  addRiders
} from "./index";


describe('addResults', () => {

  it('should return a results action', () => {
    const mockResults = [{
      fake: 'results'
    }]
    const expected = {
      type: 'ADD_RESULTS',
      results: [{
        fake: 'results'
      }]
    }

    const result = addResults(mockResults)

    expect(result).toEqual(expected)
  });
});

describe('updateResult', () => {

  it('should return a results action', () => {
    const mockResults = [{
      fake: 'results'
    }]
    const expected = {
      type: 'UPDATE_RESULT',
      results: [{
        fake: 'results'
      }]
    }

    const result = updateResult(mockResults)

    expect(result).toEqual(expected)
  });
});

describe('addRiders', () => {

  it('should return a results action', () => {
    const mockRiders = [{
      fake: 'riders'
    }]
    const expected = {
      type: 'ADD_RIDERS',
      riders: [{
        fake: 'riders'
      }]
    }

    const result = addRiders(mockRiders)

    expect(result).toEqual(expected)
  });
});
