import { Module } from '@nestjs/common';
import { BodyScanController } from './body-scan.controller';
import { BodyScanService } from './body-scan.service';

@Module({
  controllers: [BodyScanController],
  providers: [BodyScanService],
  exports: [BodyScanService],
})
export class BodyScanModule {}
