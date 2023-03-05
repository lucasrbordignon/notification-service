import { Body, Controller, Param, Patch, Post, Get } from '@nestjs/common';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { SendNotification } from 'src/app/use-cases/send-notification';
import { NotificationViewModel } from '../view-models/notification-view-moidel';
import { CancelNotification } from 'src/app/use-cases/cancel-notifications';
import { ReadNotification } from 'src/app/use-cases/read-notification';
import { UnreadNotification } from 'src/app/use-cases/unread-notification';
import { CountRecipientNotifications } from 'src/app/use-cases/count-recipient-notifications';
import { GetRecipentsNotifications } from 'src/app/use-cases/get-recipients-notifications';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendnotification: SendNotification,
    private cancelNotifications: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private countRecipientNotifications: CountRecipientNotifications,
    private getRecipientNotifications: GetRecipentsNotifications
    ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotifications.execute({
      notificationId: id
    })
  }

  @Get('from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId
    })

    return {
      notifications: notifications.map(NotificationViewModel.toHttp),
    }
  }

  @Get('count/from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId
    })

    return {
      count,
    }
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({
      notificationId: id
    })
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({
      notificationId: id
    })
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, category, content } = body

    const { notification } = await this.sendnotification.execute({
      recipientId,
      content,
      category,
    })

    return { 
      notification: NotificationViewModel.toHttp(notification)
     }
  }
}