import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PassportModule } from '@nestjs/passport';
import { SharedModule } from './shared.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [PassportModule, SharedModule, HttpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
