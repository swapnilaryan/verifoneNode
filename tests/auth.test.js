process.env.NODE_ENV = 'test';
const mockUsers = require("../mock/user.mock");
const db = require("../app/models");
const User = db.user;

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
const {describe} = require("mocha");
let should = chai.should();

chai.use(chaiHttp);

describe('Auth', () => {
  before((done) => {
    User.deleteMany({}, (err) => {
      done();
    });
  });
  after( (done) => {
    User.deleteMany({}, (err) => {
      done();
    });
    // await db.mongoose.disconnect()
    process.exit();
  });

  /*
  * Test the sign up
  */
  describe('/api/auth/signup', () => {
    it('it should create and signup a new user ', (done) => {
      const user = mockUsers[0];
      chai.request(server)
        .post('/api/auth/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('User was registered successfully!');
          done();
        });
    });
    it('it should not create same user ', (done) => {
      const user = mockUsers[0];
      chai.request(server)
        .post('/api/auth/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Failed! Username is already in use!');
          done();
        });
    });
  });
  describe('/api/auth/signin', () => {
    it('it should verify and signin a user ', (done) => {
      const user = {
        username: mockUsers[0].username,
        password: mockUsers[0].password
      }
      chai.request(server)
        .post('/api/auth/signin')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.should.have.property('username').eql(user.username);
          res.body.should.have.property('email').eql(mockUsers[0].email);
          done();
        });
    });
    it('it should prompt on wrong credentials and not signin a user ', (done) => {
      const user = {
        username: mockUsers[0].username + "1",
        password: mockUsers[0].password
      }
      chai.request(server)
        .post('/api/auth/signin')
        .send(user)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql("User Not found.");
          done();
        });
    });
  });
});

