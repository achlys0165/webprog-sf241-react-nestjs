import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { GuestbookService } from './guestbook.service';
import { CreateEntryDto, UpdateEntryDto } from './guestbook.dto';

@Controller('guestbook')
export class GuestbookController {
  constructor(private readonly service: GuestbookService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateEntryDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateEntryDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
