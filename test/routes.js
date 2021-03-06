import uuid from 'uuid';
import mocha from 'mocha';
import should from 'should';
import assert from 'assert';
import request from 'supertest';
import app from '../app/app';
import { _store } from '../app/app';
import MockStore from './helpers/mock-store';

const store = new MockStore(_store);

describe('CRUD Routes', () => {
  beforeEach(done => {
    store.cleanRecords();
    done();
  });

  describe('GET /people', () => {
    it('should return a jsonapi collection with all available people records', done => {
      store.withTwoPeople();

      request(app)
        .get('/people')
        .expect(200)
        .expect('Content-Type', 'application/vnd.api+json; charset=utf-8')
        .expect({
          data: [
            {
              id: 1,
              type: "people",
              attributes: {
                name: "test person 1"
              }
            },
            {
              id: 2,
              type: "people",
              attributes: {
                name: "test person 2"
              }
            }
          ]
        }, done);
    });

    it('should return an empty array as the data when there are no people', done => {
      request(app)
        .get('/people')
        .expect(200)
        .expect('Content-Type', 'application/vnd.api+json; charset=utf-8')
        .expect({ data: [] }, done);
    });
  });

  describe('GET /people/1', () => {
    it('should describe a person to the jsonapi spec for resources', done => {
      store.withOnePerson();

      request(app)
        .get('/people/1')
        .expect(200)
        .expect('Content-Type', 'application/vnd.api+json; charset=utf-8')
        .expect({
          data: {
            id: 1,
            type: "people",
            attributes: {
              name: "test person"
            }
          }
        }, done);
    });

    it('should return an error for a nonexistent person', done => {
      request(app)
        .get('/people/1000')
        .expect(404)
        .expect({
          errors: [ "No record found for given id and resource type" ]
        }, done);
    });
  });

  describe('POST /people', () => {
    it('should create a person', done => {
      const unique = `Test user ${Math.random()}`;

      request(app)
        .post('/people')
        .send({
          data: {
            type: "people",
            attributes: {
              name: unique
            }
          }
        })
        .expect(201)
        .expect(function(res) {
          // remove the generated id so that the objects can be compared for validation
          delete res.body.data.id;
        })
        .expect({
          data: {
            type: "people",
            attributes: {
              name: unique
            }
          }
        }, done);
    });

    it('should use an id if one is supplied', done => {
      const unique_id = uuid.v4();

      request(app)
        .post('/people')
        .send({
          data: {
            type: "people",
            id: unique_id,
            attributes: {
              name: "test user"
            }
          }
        })
        .expect(201)
        .expect(res => {
          should(res.body.data.id).equal(unique_id);
        })
        .end(done);
    });

    it('should return 409 on an id conflict', done => {
      store.withOnePerson();

      request(app)
        .post('/people')
        .send({
          data: {
            id: 1,
            type: "people",
            attributes: {
              name: "test user"
            }
          }
        })
        .expect(409, done);
    });
  });
});
