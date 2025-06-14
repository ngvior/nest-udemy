import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsPositive()
  @IsNumber()
  offset?: number;

  @IsOptional()
  @IsPositive()
  @IsNumber()
  @Min(1)
  limit?: number /* = 20 */;
}
