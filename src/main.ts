import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

import helmet from 'fastify-helmet';
import fastifyCookie from 'fastify-cookie';
import fastifySession from '@mgcrea/fastify-session';
import Redis from 'ioredis';

import { ApplicationModule } from 'src/application/application.module';
import RedisStore from '@mgcrea/fastify-session-redis-store';

const REDIS_URI = '';
const SESSION_TTL = 864e3; // 1 day in seconds
const SESSION_SECRET = 'minlength 32';

const LISTEN_PORT = 3000;
const LISTEN_IP = '::'; // all ipv6 & ipv4

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    ApplicationModule,
    new FastifyAdapter({ logger: true })
  );
  app.enableCors({ origin: true, credentials: true });
  app.register(helmet);
  app.register(fastifyCookie);
  app.register(fastifySession, {
    store: new RedisStore({
      client: new Redis(REDIS_URI),
      ttl: SESSION_TTL,
    }),
    secret: SESSION_SECRET,
    cookie: { maxAge: SESSION_TTL },
  });
  await app.listen(LISTEN_PORT, LISTEN_IP);
}

bootstrap();
