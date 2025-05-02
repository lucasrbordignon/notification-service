import { Module } from '@nestjs/common';
import { NotificationsController } from './controllers/notifications.controller';
import { SendNotification } from 'src/app/use-cases/send-notification';
import { DatabaseModule } from '../database/database.module';
import { CancelNotification } from 'src/app/use-cases/cancel-notifications';
import { CountRecipientNotifications } from 'src/app/use-cases/count-recipient-notifications';
import { GetRecipentsNotifications } from 'src/app/use-cases/get-recipients-notifications';
import { ReadNotification } from 'src/app/use-cases/read-notification';
import { UnreadNotification } from 'src/app/use-cases/unread-notification';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    CountRecipientNotifications,
    GetRecipentsNotifications,
    ReadNotification,
    UnreadNotification
  ],
})
export class HttpModule {}
