const {
  getRoutes
} = require('../service/TransitApi');

describe.skip('transit api service', () => {

  it('gets a list of stops', () => {
    return getRoutes()
      .then(routes => {
        expect(routes).toHaveLength(50);
      });
  });
});