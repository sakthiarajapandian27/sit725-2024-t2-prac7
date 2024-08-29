import chai from 'chai';
import request from 'supertest';
import server from '../server_get.js';

const { expect } = chai;

describe('API Tests', () => {
    
    describe('POST /api/query', () => {
        it('must create new query', (done) => {
            let query = {
                firstName: "Abc",
                lastName: "Def",
                emailId: "abc.def@yahoo.com",
                phoneNumber: "7878787878",
                query: "Need help in driving class."
            };

            request(server)
                .post('/api/query')
                .send(query)
                .expect(201)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message').eql('Data inserted successfully');
                    expect(res.body.savedUser).to.have.property('firstName').eql('Abc');
                    done();
                });
        });

        it('must not create a query without mandtory details', (done) => {
            let query = {
                firstName: "xyz"
            };

            request(server)
                .post('/api/query')
                .send(query)
                .expect(400)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message').eql('All fields are required.');
                    done();
                });
        });

        it('error handling in POST api request', (done) => {
            request(server)
                .post('/api/query')
                .send(null) 
                .expect(500)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.have.property('message').eql('Internal Server Error');
                    done();
                });
        });
    });

    describe('GET /api/queries', () => {
        it('should GET all user queries', (done) => {
            request(server)
                .get('/api/queries')
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
    });

    describe('Error handling', () => {
        it('must return 404 for non exsisting route', (done) => {
            request(server)
                .get('/api/nonexistent')
                .expect(404)
                .end(done);
        });
    });
});
