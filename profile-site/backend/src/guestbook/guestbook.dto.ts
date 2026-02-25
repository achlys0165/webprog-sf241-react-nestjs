import { IsString, IsNotEmpty, IsEmail, IsOptional, MinLength, MaxLength } from 'class-validator';

export class CreateEntryDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(500)
  message: string;
}

export class UpdateEntryDto {
  @IsString()
  @IsOptional()
  @MinLength(5)
  @MaxLength(500)
  message?: string;
}
