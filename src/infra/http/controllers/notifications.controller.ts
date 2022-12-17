import { CancelNotification } from '@application/useCases/cancelNotification';
import { CountRecipientNotifications } from '@application/useCases/countRecipientNotificationsMyWay';
import { GetRecipientNotifications } from '@application/useCases/getRecipientNotifications';
import { ReadNotification } from '@application/useCases/readNotification';
import { UnreadNotification } from '@application/useCases/unreadNotification';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SendNotification } from 'src/application/useCases/sendNotification';
import { CreateNotificationBody } from '../dtos/createNotificationBody';
import { NotificationViewModel } from '../viewModels/notificationViewModel';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private cancelNotification: CancelNotification,
    private countNotifications: CountRecipientNotifications,
    private getNotifications: GetRecipientNotifications,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private sendNotification: SendNotification,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string): Promise<void> {
    await this.cancelNotification.execute({
      notificationId: id,
    });
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(
    @Param('recipientId') recipientId: string,
  ): Promise<{ count: number }> {
    const count = await this.countNotifications.execute({
      recipientId: recipientId,
    });

    return count;
  }

  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipiendId: string) {
    const { notifications } = await this.getNotifications.execute({
      recipientId: recipiendId,
    });

    return notifications.map(NotificationViewModel.toHTTP);
  }

  @Patch(':id/read')
  async read(@Param('id') id: string): Promise<void> {
    await this.readNotification.execute({
      notificationId: id,
    });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string): Promise<void> {
    await this.unreadNotification.execute({
      notificationId: id,
    });
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recepientId, content, category } = body;

    const { notification } = await this.sendNotification.execute({
      recepientId,
      content,
      category,
    });

    return {
      notification: NotificationViewModel.toHTTP(notification),
    };
  }
}
