import { Injectable } from '@nestjs/common';
import { Notification } from '../../../../application/entities/notification';
import { NotificationsRepository } from '../../../../application/repositories/notificationsRepository';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class PrismaNotificationRepository implements NotificationsRepository {
  constructor(private prismaService: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    await this.prismaService.notification.create({
      data: {
        id: notification.id,
        content: notification.content.value,
        category: notification.category,
        recepientId: notification.recepientId,
        readAt: notification.readAt,
        createdAt: notification.createdAt,
      },
    });
  }
}
