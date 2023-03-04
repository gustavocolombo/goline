import { Injectable } from '@nestjs/common';
import ErrorHandling from '@shared/errors/ErrorHandling';
import { UsersRepository } from '@users/repositories/users.repository';
import { CepResponse, consultarCep } from 'correios-brasil';

@Injectable()
export class GetZipCodeByUserService {
  constructor(private userRepository: UsersRepository) {}

  async execute(user_id: string): Promise<CepResponse> {
    try {
      const user = await this.userRepository.getAddressUser(user_id);

      const cepUser = await consultarCep(user[0].zip_code);

      return cepUser;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }
}
