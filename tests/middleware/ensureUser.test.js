require('dotenv').config();
const { bearerToken, ensureUser } = require('../../lib/middleware/ensureUser');
const { tokenize } = require('../../lib/utils/token');

describe.skip('ensureAuth', () => {
  it('can get a bearer token', () => {

    const req = {
      get: () => 'Bearer abcd1234'
    };

    const next = jest.fn();

    bearerToken(req, {}, next);

    expect(req.token).toEqual('abcd1234');
    expect(next).toHaveBeenCalled();
  });

  it('can ensureAuth', () => {
    const token = tokenize({ username: 'connor' });
    
    const req = {
      token
    };

    const next = jest.fn();

    ensureUser(req, {}, next)
      .then(() => {
        expect(req.user).toEqual({ username: 'connor' });
        expect(next).toHaveBeenCalled();
      });
  });
  
});