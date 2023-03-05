import { Notification } from "src/app/entities/notification";

export class NotificationViewModel {
  static toHttp(notification: Notification) {
    return {
        id: notification.id,
        content: notification.content.value,
        category: notification.category,
        recipientId: notification.recipientId
      }
  }
}