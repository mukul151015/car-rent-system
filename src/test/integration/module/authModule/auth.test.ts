import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { createAdminToken, createAdminUser, deleteUser } from '../../utils/userCreation';
import server from '../../../../index';

chai.use(chaiHttp).request(server);


describe('User Authentication',()=>{
        describe('User-Registration',()=>{
            it('should register a new user', ()=>{
                chai.request(server)
                .post('/api/v1/auth/register')
                .send({
                    username: 'testuser',
                    email: 'testuser@gmail.com',
                    password: 'StrongPassword123',
                    residence:'saharanpur',
                })
                .end((err,res)=>{
                   // console.log(err);
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('Successfully registered');
                })
            })

            it('should handle duplicate email during registration', ()=>{
                chai.request(server)
                .post('/api/v1/auth/register')
                .send({
                    username: 'testuser',
                    email: 'testuser@gmail.com',
                    password: 'StrongPassword123',
                    residence:'saharanpur',
                })
                .end((err,res)=>{
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('error').equal('Email is already taken');
                })
            })
        })
})

// describe('Car Registration' ,()=>{
//     describe('Car-Registration',()=>{
//         it('should register a new car',()=>{
//             chai.request((server))
//             .post('/api/v1/car/register')
//             .send({
//                // userId:'c6d0b986-1326-4882-8a2e-5e2e6e79a184',
//                //should pass authorization token 
//                 model : 'Nano',
//                 price : 100000,
//             })
//             .end((err,res)=>{
//                 console.log(err + " I am error");
//                 expect(res).to.have.status(200);
//                 expect(res.body).to.have.property('message').equal('Successfully registered');
//             })
//         })
//     })
// })





let adminToken = '';
let userDetails: any = {};

describe('User Module', () => {
  before(async () => {
    userDetails = await createAdminUser();
    console.log(userDetails);
     adminToken = await createAdminToken(userDetails.user);
  });

  describe('/POST Login', () => {
    it('it should login the user', (done) => {
      const { user, password } = userDetails;

      chai.request(server)
        .post('/api/v1/authenticate') // Adjust the route based on your actual implementation
        .send({
          email: user.email,
          password: password,
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.data.user).to.have.property('token');
          done();
        });
    });
  });

  after(async () => {
    // Clean up: Delete the user created for testing
    await deleteUser(userDetails.user.userId);
  });
})
