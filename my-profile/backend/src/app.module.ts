import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GuestbookModule } from './guestbook/guestbook.module';

@Module({
  imports: [
    // THIS LINE IS CRITICAL: It reads the hidden .env file and puts it into process.env
    ConfigModule.forRoot({ isGlobal: true }), 
    GuestbookModule,
  ],
})
export class AppModule {}