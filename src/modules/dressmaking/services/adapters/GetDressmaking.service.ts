import { Injectable } from '@nestjs/common';
import { Dressmaking } from '@prisma/client';
import { database } from '../../../../shared/infra/prisma/check-connection';
import { GetAllDressmakingService } from '../GetAllDressmaking.service';
import { GetFirstDressmakingsService } from './GetFirstDressmaking.service';

@Injectable()
export class GetDressmakingAdapterService extends GetAllDressmakingService {
  private getOneDressmaking: GetFirstDressmakingsService;

  constructor(getOneDressmaking: GetFirstDressmakingsService) {
    super(database);
    this.getOneDressmaking = getOneDressmaking;
  }

  async execute(): Promise<Dressmaking> {
    return this.getOneDressmaking.getOne();
  }
}
