import { IsString, IsNotEmpty, IsOptional, MinLength, MaxLength } from 'class-validator';

export class CreateEntryDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

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
