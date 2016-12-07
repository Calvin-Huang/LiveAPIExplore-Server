import fetch from 'node-fetch';
import { expect } from 'chai';

import runServer from '../tools/runServer';

describe('server', () => {
  let serve = null;

  before(async () => {

    // Wait for server up
    serve = await runServer();
  });

  after(() => {
    serve.kill('SIGTERM');
  });

  it('should prevent response context without authorization', async () => {
    const response = await fetch('http://localhost:3000/');

    expect(response.status).to.eq(401);
  });

  it('should allow visit to page login', async () => {
    const response = await fetch('http://localhost:3000/login');

    expect(response.status).to.eq(200);
  });
});