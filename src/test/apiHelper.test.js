import postData from '../apiHelper'
import getData from '../apiHelper'

postData.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve({ user: 'EXAMPLE', score: 20 }),
}));

getData.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve({ user: 'EXAMPLE', score: 20 }),
}));

describe('Using an API to post new scores', () => {
  test('Should save a new score with the username', () => postData('EXAMPLE', 20).then(response => {
    expect(typeof response).toBe('object');
  }));
});

describe('Get the 6 highest scores.', () => {
  test('Should return an object', () => getData().then(response => {
    expect(typeof response).toBe('object');
  }));
});