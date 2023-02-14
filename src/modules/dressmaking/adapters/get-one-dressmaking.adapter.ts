import { Injectable } from '@nestjs/common';
import { Dressmaking } from '@prisma/client';
import ErrorHandling from '../../../shared/errors/ErrorHandling';
import { database } from '../../../shared/infra/prisma/check-connection';
import { SearchDressmakings } from '../implementations/search-dressmakings.interface';
import { GetOneDressmakingsService } from '../services/adapters/get-one-dressmaking.service';

@Injectable()
export class GetOneDressmakingAdapter
  extends GetOneDressmakingsService
  implements SearchDressmakings
{
  constructor() {
    super(database);
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
