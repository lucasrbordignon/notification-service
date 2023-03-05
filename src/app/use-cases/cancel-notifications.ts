import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "../repositories/notifications-repository";
import { NotificationNotFound } from "./errors/notification-not-found";

interface CancelNotificationsRequest {
  notificationId: string;
}

type CancelNotificationsResponse = void

@Injectable()
export class CancelNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: CancelNotificationsRequest
    ): Promise<CancelNotificationsResponse> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(notificationId)

    if (!notification) {
      throw new NotificationNotFound()
    }

    notification.cancel()

    await this.notificationsRepository.save(notification)
  }
}