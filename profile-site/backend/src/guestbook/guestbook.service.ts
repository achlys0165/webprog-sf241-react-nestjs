import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateEntryDto, UpdateEntryDto } from './guestbook.dto';

const TABLE = 'guestbook';

@Injectable()
export class GuestbookService {
  constructor(private supabase: SupabaseService) {}

  async findAll() {
    const { data, error } = await this.supabase
      .getClient()
      .from(TABLE)
      .select('id, name, message, created_at')
      .order('created_at', { ascending: false });

    if (error) throw new InternalServerErrorException(error.message);
    return data;
  }

  async findOne(id: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from(TABLE)
      .select('id, name, message, created_at')
      .eq('id', id)
      .single();

    if (error || !data) throw new NotFoundException(`Entry ${id} not found`);
    return data;
  }

  async create(dto: CreateEntryDto) {
    const { data, error } = await this.supabase
      .getClient()
      .from(TABLE)
      .insert({ name: dto.name, message: dto.message })
      .select('id, name, message, created_at')
      .single();

    if (error) throw new InternalServerErrorException(error.message);
    return data;
  }

  async update(id: string, dto: UpdateEntryDto) {
    await this.findOne(id);

    const { data, error } = await this.supabase
      .getClient()
      .from(TABLE)
      .update({ message: dto.message })
      .eq('id', id)
      .select('id, name, message, created_at')
      .single();

    if (error) throw new InternalServerErrorException(error.message);
    return data;
  }

  async remove(id: string) {
    await this.findOne(id);

    const { error } = await this.supabase
      .getClient()
      .from(TABLE)
      .delete()
      .eq('id', id);

    if (error) throw new InternalServerErrorException(error.message);
    return { message: 'Entry deleted successfully' };
  }
}
