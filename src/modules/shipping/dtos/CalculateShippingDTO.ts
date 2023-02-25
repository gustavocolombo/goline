import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CalculateShippingDTO {
  @ApiProperty()
  @IsUUID(4)
  @IsNotEmpty()
  user_id: string;

  @ApiProperty()
  @IsUUID(4)
  @IsNotEmpty()
  dressmaker_id: string;

  @ApiProperty({
    description:
      'Peso da encomenda, incluindo sua embalagem. O peso deve ser informado em quilogramas. Se o formato for Envelope, o valor máximo permitido será 1 kg',
  })
  @IsString()
  @IsNotEmpty()
  nVlPeso: string;

  @ApiProperty({
    description:
      'Formato da encomenda (incluindo embalagem) 1 - formato caixa/pacote 2 - formato rolo/prisma 3 - Envelope',
  })
  @IsString()
  @IsNotEmpty()
  nCdFormato: string;

  @ApiProperty({
    description:
      'Comprimento da encomenda (incluindo embalagem), em centímetros',
  })
  @IsNotEmpty()
  @IsString()
  nVlComprimento: string;

  @ApiProperty({
    description:
      'Altura da encomenda (incluindo embalagem), em centímetros. Se o formato for envelope, informar zero (0)',
  })
  @IsNotEmpty()
  @IsString()
  nVlAltura: string;

  @ApiProperty({
    description: 'Largura da encomenda (incluindo embalagem), em centímetros',
  })
  @IsNotEmpty()
  @IsString()
  nVlLargura: string;

  @ApiProperty({
    description: 'Diâmetro da encomenda (incluindo embalagem), em centímetros',
  })
  @IsNotEmpty()
  @IsString()
  nVlDiametro: string;
}
