import { Controller, Get, Put, Body } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './profile.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly service: ProfileService) {}

  @Get()
  getProfile() {
    return this.service.getProfile();
  }

  @Put()
  updateProfile(@Body() dto: UpdateProfileDto) {
    return this.service.updateProfile(dto);
  }
}
