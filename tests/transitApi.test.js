const {
  getRoutes
} = require('../service/TransitApi');

describe('transit api service', () => {

  it('gets a list of stops', () => {
    return getRoutes()
      .then(routes => {
        console.log('list of routes', routes);
        expect(routes).toHaveLength(50);
      });
  });
});