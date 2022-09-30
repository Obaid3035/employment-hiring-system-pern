import request from 'supertest';
import { afterAll, beforeEach } from '@jest/globals';
import db, { User } from '../../index';
import app from '../app';
import seedDatabase from './utils/seedDatabase';

beforeEach(seedDatabase);

afterAll(async (done) => {
  db.sequelize.close();
  done();
});

describe('Full Authentication', () => {
  test('Should register a new user', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        email: 'ob12@gmail.com',
        password: '12345678',
      }).expect(201);
    const user = await User.findByPk(response.body.id);
    expect(user).not.toBeNull();
  });
});
