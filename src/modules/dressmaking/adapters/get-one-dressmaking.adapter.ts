import { Injectable } from '@nestjs/common';
import { Dressmaking } from '@prisma/client';
import ErrorHandling from '../../../shared/errors/ErrorHandling';
import { PrismaService } from '../../../shared/infra/prisma/prisma.service';
import { SearchDressmakings } from '../implementations/search-dressmakings.interface';
import { GetOneDressmakingsService } from '../services/adapters/get-one-dressmaking.service';

@Injectable()
export class GetOneDressmakingAdapter
  extends GetOneDressmakingsService
  implements SearchDressmakings
{
  constructor() {
    super(new PrismaService());
  }

  async search(id: string): Promise<Dressmaking | Dressmaking[]> {
    try {
      const dressmakings = this.getOne(id);

      return dressmakings;
    } catch (error) {
      throw new ErrorHandling(error);
    }
  }
}
