import mocha from 'mocha';
import should from 'should';
import assert from 'assert';
import request from 'supertest';
import app from '../app/app';

describe('CRUD Routes', function () {
  describe('GET /people', function () {
    it('should return a jsonapi content type', function (done) {
      request(app)
        .get('/people')
        .expect('Content-Type', 'application/vnd.api+json; charset=utf-8')
        .end(done);
    });

    it('should return a collection', function (done) {
      request(app)
        .get('/people')
        .expect({
          data: []
        })
        .end(done);
    });
  });
});
