const {
  getRoutes
} = require('../service/TransitApi');

describe('transit api service', () => {
  // it('gets a stop by name', () => {
  //   return getRoute()
  //     .then(stop => {
  //       expect(stop).toEqual({
  //         name: 'SW 5th & Alder',

  //       });
  //     });
  // });
  it('gets a list of stops', () => {
    return getRoutes(20)
      .then(routes => {
        console.log(routes);
        expect(routes).toHaveLength(20);
      });
  });
});