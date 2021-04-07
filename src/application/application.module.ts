import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { GlobalCacheModule } from 'src/global-cache/global-cache.module';

@Module({
  imports: [AuthModule, UsersModule, GlobalCacheModule],
})
export class ApplicationModule {}
