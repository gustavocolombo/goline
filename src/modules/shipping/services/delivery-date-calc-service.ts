import { Injectable, NotFoundException } from '@nestjs/common';
import ErrorHandling from '../../../shared/errors/ErrorHandling';
import { DressmakerRepository } from '../../dressmaker/repositories/dressmakers.repository';
import { UsersRepository } from '../../users/repositories/users.repository';
import { CalculateShippingDTO } from '../dtos/CalculateShippingDTO';
import { calcularPrecoPrazo, PrecoPrazoResponse } from 'correios-brasil';

@Injectable()
export class DeliveryDateCalcService {
  constructor(
    private userRepository: UsersRepository,
    private dressmakerRepository: DressmakerRepository,
  ) {}

  async execute({
    user_id,
    dressmaker_id,
    nVlPeso,
    nCdFormato,
    nVlComprimento,
    nVlAltura,
    nVlLargura,
    nVlDiametro,
  }: CalculateShippingDTO): Promise<PrecoPrazoResponse[]> {
    try {
      const [user, dressmaker] = await Promise.allSettled([
        await this.userRepository.findOne(user_id),
        await this.dressmakerRepository.findOne(dressmaker_id),
      ]);

      if (user.status === 'rejected' || !user.value) {
        throw new NotFoundException(
          'User not found, please provide a valid id',
        );
      }

      if (dressmaker.status === 'rejected' || !dressmaker.value) {
        throw new NotFoundException(
          'Dressmaker not found, please provide a valid id',
        );
      }

      const [addressUser, addressDressmaker] = await Promise.all([
        await this.userRepository.getAddressUser(user.value.id),
        await this.dressmakerRepository.getAddressUser(dressmaker.value.id),
      ]);

      const shipping = await calcularPrecoPrazo({
        sCepOrigem: addressDressmaker[0].zip_code,
        sCepDestino: addressUser[0].zip_code,
        nCdServico: ['04510', '04014'],
        nVlPeso,
        nCdFormato,
        nVlComprimento,
        nVlAltura,
        nVlLargura,
        nVlDiametro,
      });

      return shipping;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }
}
