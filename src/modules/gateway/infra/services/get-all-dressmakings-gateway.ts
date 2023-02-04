import { Cron, CronExpression } from '@nestjs/schedule';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { StatusUser } from '@prisma/client';
import { PrismaService } from '../../../../shared/infra/prisma/prisma.service';
import { GetAllDressmakingDTO } from '../../../dressmaker/dtos/GetDressmakingsDTO';
import { GetAllDressmakingsImplementations } from '../../../dressmaker/implementations/dressmakings/get-all-dressmakings.implementation';
import { Server } from 'socket.io';

@WebSocketGateway(3001)
export class GetAllDressmakingsGateway
  implements GetAllDressmakingsImplementations
{
  constructor(private prismaService: PrismaService) {}

  @WebSocketServer()
  server: Server;

  @Cron(CronExpression.EVERY_10_MINUTES)
  @SubscribeMessage('dressmakings')
  async getAllDressmakings(): Promise<GetAllDressmakingDTO[]> {
    const dressmakings = await this.prismaService.dressmaking.findMany({
      where: {
        grabbed: false,
        dressmaker: {
          status: StatusUser.ACTIVE,
        },
      },
      select: {
        id: true,
        name_service: true,
        grabbed: true,
        price: true,
        start_date: true,
        end_date: true,
        dressmaker: {
          select: {
            id: true,
            email: true,
            status: true,
          },
        },
      },
    });

    this.server.emit('dressmakings', {
      msg: 'New dressmaking was added',
      content: dressmakings,
    });

    return dressmakings;
  }
}
