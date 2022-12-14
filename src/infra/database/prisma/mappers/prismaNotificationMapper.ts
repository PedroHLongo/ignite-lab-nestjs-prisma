import { Notification } from '@application/entities/notification';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      category: notification.category,
      content: notification.content.value,
      recepientId: notification.recepientId,
      readAt: notification.readAt,
      createdAt: notification.createdAt,
    };
  }
}
