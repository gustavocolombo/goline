import { Injectable } from '@nestjs/common';
import { Dressmaking } from '@prisma/client';
import { SearchDressmakings } from '../../implementations/search-dressmakings.interface';

@Injectable()
export class GetDressmakingService {
  async execute(
    dressmaking: SearchDressmakings,
  ): Promise<Dressmaking | Dressmaking[]> {
    return await dressmaking.search();
  }
}
