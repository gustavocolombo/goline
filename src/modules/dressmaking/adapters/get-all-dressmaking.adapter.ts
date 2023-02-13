import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/infra/prisma/prisma.service';
import { SearchDressmakings } from '../implementations/search-dressmakings.interface';
import { Dressmaking } from '@prisma/client';
import { GetAllDressmakingsService } from '../services/adapters/get-all-dressmaking.service';
import ErrorHandling from '../../../shared/errors/ErrorHandling';

@Injectable()
export class GetAllDressmakingAdapter
  extends GetAllDressmakingsService
  implements SearchDressmakings
{
  constructor() {
    super(new PrismaService());
  }

  async search(): Promise<Dressmaking | Dressmaking[]> {
    try {
      const dressmakings = await this.getAll();

      return dressmakings;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }
}
