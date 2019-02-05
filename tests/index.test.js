const User = require('../lib/models/User');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const request = require('supertest');
const app = require('../lib/app');

describe('User', () => {

  const createUser = (username, password) => {
    return User.create({ username, password })
      .then(user => ({ ...user, _id: user._id.toString() }));
  };

  let user = null;
  beforeEach(done => {
    rimraf('./testData/user', err => {
      done(err);
    });
  });

  beforeEach(done => {
    mkdirp('./testData/user', err => {
      done(err);
    });
  });

  beforeEach(() => {
    user = new User({ username: 'username', password: 'password' });
  });

  it.only('creates a user', () => {
    return createUser('abel', 'password')
      .then(user => {
        return request(app)
          .post('/users')
          .send({
            username: user._id,
            password: 'password'
          })
          .then(res => {
            expect(res.body).toEqual({
              username: expect.any(String),
              password: 'password',
              _id: expect.any(String),
              __v: 0
            });
          });
      });
  });

  it('finds an object by id', done => {
    user.create({ name: 'uncle bob' }, (err, createdUser) => {
      user.findById(createdUser._id, (err, foundUser) => {
        expect(err).toBeFalsy();
        expect(foundUser).toEqual({ name: 'uncle bob', _id: createdUser._id });
        done();
      });
    });

  });

  it('throws an error if id does not exist', () => {
    
    user.findById(1234, (err) => {
      expect(err).toBeTruthy();
        
    });
  });


  it('finds an object by id and delete if object is removed', done => {
    user.create({ name: 'uncle bob' }, (err, createdUser) => {
      user.findById(createdUser._id, (err, foundUser) => {
        user.findByIdAndDelete(foundUser._id, (err, deletedUser) => {
          expect(err).toBeFalsy();
          expect(deletedUser).toEqual({ deleted: 1 });
          done();
        });

      });
    }); 
  });
    

  it('finds all paths stored by a user', done => {
    user.create({ name: 'path1' }, (err, path1) => {
      user.create({ name: 'path2' }, (err, path2) => {
        user.create({ name: 'path3' }, (err, path3) => {
          user.create({ name: 'path4' }, (err, path4) => {
            user.create({ name: 'path5' }, (err, path5) => {
              user.find((err, listOfPaths) => {
                expect(err).toBeFalsy();
                expect(listOfPaths).toHaveLength(5);
                expect(listOfPaths).toContainEqual(path1);
                expect(listOfPaths).toContainEqual(path2);
                expect(listOfPaths).toContainEqual(path3);
                expect(listOfPaths).toContainEqual(path4);
                expect(listOfPaths).toContainEqual(path5);
                done();
              });
            });
          });
        });
      });
    });
  });

}); 