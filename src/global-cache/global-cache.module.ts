import { CacheInterceptor, CacheModule, Global, Module } from '@nestjs/common';
import redisStore from 'cache-manager-ioredis';
import { APP_INTERCEPTOR } from '@nestjs/core';

const REDIS_PORT = 6379; // default value
const REDIS_HOST = 'locahost'; // default value
const REDIS_PASSWORD = undefined;
const CACHE_TTL_SECONDS = 600;

@Global()
@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: REDIS_HOST,
      port: REDIS_PORT,
      password: REDIS_PASSWORD,
      ttl: CACHE_TTL_SECONDS,
    }),
  ],
  // Register the cache interceptor on ALL `GET` routes on ALL controllers
  // NOTE: CacheInterceptor is NOT a HTTP caching mechanism and it does NOT work for all usecases!
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
  exports: [CacheModule],
})
export class GlobalCacheModule {}
