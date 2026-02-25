import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { GuestbookService } from './guestbook.service';

@Controller('guestbook')
export class GuestbookController {
  constructor(private readonly guestbookService: GuestbookService) {}

  @Get()
  findAll() {
    return this.guestbookService.findAll();
  }

  @Post()
  create(@Body() body: { name: string; message: string }) {
    return this.guestbookService.create(body.name, body.message);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: { name: string; message: string }) {
    return this.guestbookService.update(+id, body.name, body.message);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.guestbookService.remove(+id);
  }
}