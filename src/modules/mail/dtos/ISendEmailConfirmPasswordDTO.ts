import { Users } from '@prisma/client';

interface ISendEmailConfirmPasswordDTO {
  user: Users;
}

export default ISendEmailConfirmPasswordDTO;
