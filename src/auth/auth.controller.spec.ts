import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';
import { AuthModule } from './auth.module';

describe('Authentication', () => {
  let app: NestFastifyApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();
    app = moduleRef.createNestApplication<NestFastifyApplication>(new FastifyAdapter());
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  afterAll(async () => {
    return await app.close();
  });

  it('wrong password results in 401 error', async () => {
    return await app
      .inject({
        method: 'POST',
        url: '/auth/login',
        payload: {
          username: 'john',
          password: '--[WRONG PASSWORD]--',
        },
      })
      .then((response) => {
        expect(response.statusCode).toEqual(401);
        expect(response.payload).toEqual('{"statusCode":401,"message":"Unauthorized"}');
      });
  });

  it('unknown username results in 401 error', async () => {
    return await app
      .inject({
        method: 'POST',
        url: '/auth/login',
        payload: {
          username: '--[UNKNOWN USERNAME]--',
          password: '--[DOES NOT MATTER]--',
        },
      })
      .then((response) => {
        expect(response.statusCode).toEqual(401);
        expect(response.payload).toEqual('{"statusCode":401,"message":"Unauthorized"}');
      });
  });

  it('accessing profile without JWT ends up in an error', async () => {
    return await app
      .inject({
        method: 'GET',
        url: '/users/profile',
      })
      .then((response) => {
        expect(response.statusCode).toEqual(401);
        expect(response.payload).toEqual('{"statusCode":401,"message":"Unauthorized"}');
      });
  });

  it('when receiving the JWT provided after login, return user data', async () => {
    const loginResponse = await app.inject({
      method: 'POST',
      url: '/auth/login',
      payload: {
        username: 'john',
        password: 'changeme',
      },
    });

    const jwt = JSON.parse(loginResponse.payload).accessToken;
    const profileResponse = await app.inject({
      method: 'GET',
      url: '/users/profile',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    const user = JSON.parse(profileResponse.payload);

    expect(user).toEqual({ userId: 1, username: 'john' });
  });
});
