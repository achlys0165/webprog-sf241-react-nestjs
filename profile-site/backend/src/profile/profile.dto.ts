import { IsString, IsOptional, IsArray, IsUrl } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsUrl()
  @IsOptional()
  avatar_url?: string;

  @IsUrl()
  @IsOptional()
  github_url?: string;

  @IsUrl()
  @IsOptional()
  linkedin_url?: string;

  @IsArray()
  @IsOptional()
  skills?: string[];
}
