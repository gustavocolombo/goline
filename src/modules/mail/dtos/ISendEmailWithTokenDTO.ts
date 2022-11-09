import { Users } from '@prisma/client';

interface ISendEmailWithTokenDTO {
  user: Users;
  token: string;
}

export default ISendEmailWithTokenDTO;
