/*
*
*       To run the tests on Repl.it, set `NODE_ENV` to `test`
*       without quotes in the `.env` file.
*       To run the tests in the console, open the terminal
*       with [Ctrl + `] (backtick) and run the command `npm run test`.
*
*/
import chai from 'chai';
const assert = chai.assert;
import chaiHttp from 'chai-http';
import server from '../server.js'; // Keep the .js extension here

chai.use(chaiHttp);

suite('Functional Tests', () => {

  suite('Headers test', () => {
    test("Prevent the client from trying to guess / sniff the MIME type.", done => {
      chai.request(server)
        .get('/')
        .end((err, res) => {
          assert.strictEqual(res.header['x-content-type-options'], 'nosniff');
          done();
        });
    });

    test("Prevent cross-site scripting (XSS) attacks.", done => {
      chai.request(server)
        .get('/')
        .end((err, res) => {
          assert.strictEqual(res.header['x-xss-protection'], '1; mode=block');
          done();
        });
    });

   test("Nothing from the website is cached in the client.", done => {
      chai.request(server)
        .get('/')
        .end((err, res) => {
          assert.include(res.header['cache-control'], 'no-store');
          assert.include(res.header['cache-control'], 'no-cache');
          assert.include(res.header['cache-control'], 'must-revalidate');
          assert.include(res.header['cache-control'], 'proxy-revalidate');
          assert.strictEqual(res.header['pragma'], 'no-cache');
          assert.strictEqual(res.header['expires'], '0');
          done();
        });
    });

    test("The headers say that the site is powered by 'PHP 7.4.3'.", done => {
      chai.request(server)
        .get('/')
        .end((err, res) => {
          assert.strictEqual(res.header['x-powered-by'], 'PHP 7.4.3');
          done();
        });
    });
  });

});
