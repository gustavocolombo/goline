import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../shared/infra/prisma/prisma.service';

@Injectable()
export class SendMailWithTokenService {
  constructor(private prismaService: PrismaService) {}
}
