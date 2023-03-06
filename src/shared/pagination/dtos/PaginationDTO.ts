import { IsOptional, IsString } from 'class-validator';

export class PaginationDTO {
  @IsString()
  @IsOptional()
  page?: string;

  @IsString()
  @IsOptional()
  qtd?: string;
}
