import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared.module';
import { StreamingController } from './streaming.controller';
import { StreamingService } from './streaming.service';

@Module({
  imports: [SharedModule],
  controllers: [StreamingController],
  providers: [StreamingService],
})
export class StreamingModule {}