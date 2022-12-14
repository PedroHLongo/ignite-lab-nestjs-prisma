import { Module } from '@nestjs/common';
import { NotificationsRepository } from 'src/application/repositories/notificationsRepository';
import { PrismaService } from '../prisma.service';
import { PrismaNotificationRepository } from './repositories/prismaNotificationsRepository';

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationsRepository,
      useClass: PrismaNotificationRepository,
    },
  ],
  exports: [NotificationsRepository],
})
export class DatabaseModule {}
