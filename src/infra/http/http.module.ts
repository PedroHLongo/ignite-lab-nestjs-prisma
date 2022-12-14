import { Module } from '@nestjs/common';
import { SendNotification } from 'src/application/useCases/sendNotification';
import { DatabaseModule } from '../database/prisma/database.module';
import { NotificationsController } from './controllers/notifications.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [SendNotification],
})
export class HttpModule {}
