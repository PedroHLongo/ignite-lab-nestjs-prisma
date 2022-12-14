import { Body, Controller, Post } from '@nestjs/common';
import { SendNotification } from 'src/application/useCases/sendNotification';
import { CreateNotificationBody } from '../dtos/createNotificationBody';

@Controller('notifications')
export class NotificationsController {
  constructor(private sendNotification: SendNotification) {}

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recepientId, content, category } = body;

    const { notification } = await this.sendNotification.execute({
      recepientId,
      content,
      category,
    });

    return { notification };
  }
}
