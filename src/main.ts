import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

import helmet from 'fastify-helmet';
import fastifyCookie from 'fastify-cookie';
import fastifySession from '@mgcrea/fastify-session';
import Redis from 'ioredis';

import { ApplicationModule } from 'src/application/application.module';
import RedisStore from '@mgcrea/fastify-session-redis-store';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    ApplicationModule,
    new FastifyAdapter({ logger: true })
  );
  const configService = app.get(ConfigService);
  app.enableCors({ origin: true, credentials: true });
  app.register(helmet);
  app.register(fastifyCookie);
  const REDIS_URI = configService.get<string>('REDIS_URI');
  const SESSION_TTL = configService.get<number>('SESSION_TTL');
  const SESSION_SECRET = configService.get<string>('SESSION_SECRET');
  app.register(fastifySession, {
    store: new RedisStore({
      client: new Redis(REDIS_URI),
      ttl: SESSION_TTL,
    }),
    secret: SESSION_SECRET,
    cookie: { maxAge: SESSION_TTL },
  });
  const LISTEN_PORT = configService.get<number>('LISTEN_PORT', 3000);
  const LISTEN_IP = configService.get<string>('LISTEN_IP', '::');
  await app.listen(LISTEN_PORT, LISTEN_IP);
}

bootstrap();
