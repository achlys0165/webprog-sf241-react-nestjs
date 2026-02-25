import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateEntryDto, UpdateEntryDto } from './guestbook.dto';

@Injectable()
export class GuestbookService {
  constructor(private supabase: SupabaseService) {}

  async findAll() {
    const { data, error } = await this.supabase
      .getClient()
      .from('guestbook_entries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new InternalServerErrorException(error.message);
    return data;
  }

  async findOne(id: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('guestbook_entries')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) throw new NotFoundException(`Entry ${id} not found`);
    return data;
  }

  async create(dto: CreateEntryDto) {
    const { data, error } = await this.supabase
      .getClient()
      .from('guestbook_entries')
      .insert({ name: dto.name, email: dto.email, message: dto.message })
      .select()
      .single();

    if (error) throw new InternalServerErrorException(error.message);
    return data;
  }

  async update(id: string, dto: UpdateEntryDto) {
    await this.findOne(id);

    const { data, error } = await this.supabase
      .getClient()
      .from('guestbook_entries')
      .update({ message: dto.message, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new InternalServerErrorException(error.message);
    return data;
  }

  async remove(id: string) {
    await this.findOne(id);

    const { error } = await this.supabase
      .getClient()
      .from('guestbook_entries')
      .delete()
      .eq('id', id);

    if (error) throw new InternalServerErrorException(error.message);
    return { message: 'Entry deleted successfully' };
  }
}
