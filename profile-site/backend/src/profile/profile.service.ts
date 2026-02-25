import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { UpdateProfileDto } from './profile.dto';

const PROFILE_ID = 1; // Single profile

@Injectable()
export class ProfileService {
  constructor(private supabase: SupabaseService) {}

  async getProfile() {
    const { data, error } = await this.supabase
      .getClient()
      .from('profile')
      .select('*')
      .eq('id', PROFILE_ID)
      .single();

    if (error || !data) throw new NotFoundException('Profile not found');
    return data;
  }

  async updateProfile(dto: UpdateProfileDto) {
    const { data, error } = await this.supabase
      .getClient()
      .from('profile')
      .update({ ...dto, updated_at: new Date().toISOString() })
      .eq('id', PROFILE_ID)
      .select()
      .single();

    if (error) throw new InternalServerErrorException(error.message);
    return data;
  }
}
