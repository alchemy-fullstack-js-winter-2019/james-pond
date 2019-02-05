const {
  getRoute
} = require('../service/TransitApi');

describe.skip('transit api service', () => {
  it('gets a stop by name', () => {
    return getRoute(1)
      .then(stop => {
        expect(stop).toEqual({
          name: 'SW 5th & Alder',

        });
      });
  });
});