import { Module } from '@nestjs/common';
import { GuestbookService } from './guestbook.service';
import { GuestbookController } from './guestbook.controller';

@Module({
  providers: [GuestbookService],
  controllers: [GuestbookController]
})
export class GuestbookModule {}
