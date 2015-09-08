import mocha from 'mocha';
import should from 'should';
import assert from 'assert';
import request from 'supertest';
import app from '../app/app';

describe('CRUD Routes', function () {
  describe('GET /people', function () {
    it('should return a jsonapi collection', function (done) {
      request(app)
        .get('/people')
        .expect('Content-Type', 'application/vnd.api+json; charset=utf-8')
        .expect({
          data: []
        })
        .end(done);
    });
  });

  describe('GET /people/1', function () {
    it('should return a jsonapi resource object', function (done) {
      request(app)
        .get('/people/1')
        .expect('Content-Type', 'application/vnd.api+json; charset=utf-8')
        .expect({
          data: {}
        })
        .end(done);
    })
  });
});
