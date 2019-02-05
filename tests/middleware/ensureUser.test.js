require('dotenv').config();
const { bearerToken, ensureAuth } = require('../../lib/middleware/ensureUser');
const { tokenize } = require('../../lib/utils/token');

describe('ensureAuth', () => {
  it('can get a bearer token', () => {
    const req = {
      get: () => 'Bearer abcd1234'
    };

    const next = jest.fn();

    bearerToken(req, {}, next);

    expect(req.token).toEqual('abcd1234');
    expect(next).toHaveBeenCalled();
  });
});