import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { GlobalCacheModule } from 'src/global-cache/global-cache.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, expandVariables: true }),
    AuthModule,
    UsersModule,
    GlobalCacheModule,
  ],
})
export class ApplicationModule {}
