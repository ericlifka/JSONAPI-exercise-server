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
    it('should return a jsonapi collection', done => {
      store.withTwoPeople();

      request(app)
        .get('/people')
        .expect(200)
        .expect('Content-Type', 'application/vnd.api+json; charset=utf-8')
        .expect({
          data: []
        }, done);
    });

    it('should return all people as jsonapi resources', done => {
      done();
    });

    it('should return an empty array as the data when there are no people', done => {
      done();
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
          errors: [ "No record found for given id" ]
        }, done);
    });
  });
});
