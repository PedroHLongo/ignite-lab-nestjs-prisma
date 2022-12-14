import { Content } from '../entities/content';
import { Notification } from '../entities/notification';
import { NotificationsRepository } from '../repositories/notificationsRepository';

interface SendNotificationRequest {
  recepientId: string;
  content: string;
  category: string;
}

interface SendNotificationResponse {
  notification: Notification;
}

export class SendNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: SendNotificationRequest,
  ): Promise<SendNotificationResponse> {
    const { recepientId, content, category } = request;

    const notification = new Notification({
      recepientId,
      content: new Content(content),
      category,
    });

    await this.notificationsRepository.create(notification);

    return {
      notification,
    };
  }
}
