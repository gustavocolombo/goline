import { Injectable } from '@nestjs/common';
import { SearchDressmakings } from '../implementations/search-dressmakings.interface';
import { Dressmaking } from '@prisma/client';
import { GetAllDressmakingsService } from '../services/adapters/get-all-dressmaking.service';
import ErrorHandling from '../../../shared/errors/ErrorHandling';
import { database } from '../../../shared/infra/prisma/check-connection';

@Injectable()
export class GetAllDressmakingAdapter
  extends GetAllDressmakingsService
  implements SearchDressmakings
{
  constructor() {
    super(database);
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
