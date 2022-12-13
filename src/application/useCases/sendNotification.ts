import { Content } from '../entities/content';
import { Notification } from '../entities/notification';

interface SendNotificationRequest {
  recepientId: string;
  content: string;
  category: string;
}

interface SendNotificationResponse {
  notification: Notification;
}

export class SendNotification {
  async execute(
    request: SendNotificationRequest,
  ): Promise<SendNotificationResponse> {
    const { recepientId, content, category } = request;

    const notification = new Notification({
      recepientId,
      content: new Content(content),
      category,
    });

    return {
      notification,
    };
  }
}
