import mocha from 'mocha';
import should from 'should';
import assert from 'assert';
import request from 'supertest';

describe('Routing', function () {
  it('should run a simple test', function () {
    should(5).equal(5);
  });
});
