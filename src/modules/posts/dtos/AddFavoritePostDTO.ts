import { Users } from '@prisma/client';
import { IsNotEmpty, IsObject, IsString, IsUUID } from 'class-validator';

export class AddFavoritePostDTO {
  @IsUUID(4)
  @IsString()
  @IsNotEmpty()
  post_id: string;

  @IsObject()
  @IsNotEmpty()
  user: Users;
}
