import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "../repositories/notifications-repository";
import { Notification } from "../entities/notification";

interface GetRecipentsNotificationsRequest {
  recipientId: string;
}

interface GetRecipentsNotificationsResponse {
  notifications: Notification[];
}

@Injectable()
export class GetRecipentsNotifications {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: GetRecipentsNotificationsRequest
    ): Promise<GetRecipentsNotificationsResponse> {
    const { recipientId } = request;

    const notifications = await this.notificationsRepository.findManyByRecipientId(recipientId)

    return { notifications }
  }
}