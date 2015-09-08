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
        .expect(200)
        .expect('Content-Type', 'application/vnd.api+json')
        .end(done);
    });
  });
});
