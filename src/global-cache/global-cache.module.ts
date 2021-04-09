import { CacheInterceptor, CacheModule, Global, Module } from '@nestjs/common';
import redisStore from 'cache-manager-ioredis';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get<string>('REDIS_HOST', 'localhost'),
        port: configService.get<number>('REDIS_PORT', 6379),
        password: configService.get('REDIS_PASSWORD', undefined),
        ttl: configService.get<number>('CACHE_TTL_SECONDS', 600),
      }),
      inject: [ConfigService],
    }),
  ],
  // Register the cache interceptor on ALL `GET` routes on ALL controllers
  // NOTE: CacheInterceptor is NOT a HTTP caching mechanism and it does NOT work for all use cases!
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
  exports: [CacheModule],
})
export class GlobalCacheModule {}
