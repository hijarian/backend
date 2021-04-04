import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

import helmet from 'fastify-helmet';

import { ApplicationModule } from 'src/application/application.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    ApplicationModule,
    new FastifyAdapter({ logger: true })
  );
  app.enableCors({ origin: true, credentials: true });
  app.register(helmet);
  await app.listen(3000, '0.0.0.0');
}

bootstrap();
