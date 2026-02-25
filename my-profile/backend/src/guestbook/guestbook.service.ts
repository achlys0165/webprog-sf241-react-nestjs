import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class GuestbookService {
  private supabase: SupabaseClient;

  constructor() {
    // We use 'as string' to assure TypeScript that these variables will be 
    // provided by the hidden .env file at runtime. No keys are hardcoded here!
    this.supabase = createClient(
      process.env.SUPABASE_URL as string,
      process.env.SUPABASE_KEY as string
    );
  }

  // GET: Fetch all guestbook entries
  async findAll() {
    const { data, error } = await this.supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) throw new InternalServerErrorException(error.message);
    return data;
  }

  // POST: Create a new guestbook entry
  async create(name: string, message: string) {
    const { data, error } = await this.supabase
      .from('guestbook')
      .insert([{ name, message }])
      .select();
      
    if (error) throw new InternalServerErrorException(error.message);
    return data;
  }

  // PUT: Update an existing entry
  async update(id: number, name: string, message: string) {
    const { data, error } = await this.supabase
      .from('guestbook')
      .update({ name, message })
      .eq('id', id)
      .select();
      
    if (error) throw new InternalServerErrorException(error.message);
    return data;
  }

  // DELETE: Remove an entry
  async remove(id: number) {
    const { error } = await this.supabase
      .from('guestbook')
      .delete()
      .eq('id', id);
      
    if (error) throw new InternalServerErrorException(error.message);
    return { success: true };
  }
}