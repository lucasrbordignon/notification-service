import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "../repositories/notifications-repository";
import { NotificationNotFound } from "./errors/notification-not-found";

interface ReadNotificationsRequest {
  notificationId: string;
}

type ReadNotificationsResponse = void

@Injectable()
export class ReadNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: ReadNotificationsRequest
    ): Promise<ReadNotificationsResponse> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(notificationId)

    if (!notification) {
      throw new NotificationNotFound()
    }

    notification.read()

    await this.notificationsRepository.save(notification)
  }
}