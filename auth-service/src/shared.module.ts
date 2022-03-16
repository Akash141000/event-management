import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { AuthStrategy } from './auth.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.dev.env' }),
    PassportModule.register({
      session: false,
      defaultStrategy: 'oauth-bearer',
    }),
  ],
  providers: [AuthStrategy, AuthService,JwtAuthGuard],
  exports: [ConfigModule, PassportModule,AuthService,AuthStrategy],
})
export class SharedModule {}
