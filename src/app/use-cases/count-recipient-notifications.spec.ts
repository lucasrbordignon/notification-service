import { inMemoryNotificationsRepository } from "../../../test/repositories/in-memory-notifications-repository"
import { CountRecipientNotifications } from "./count-recipient-notifications"
import { makeNotification } from "../../../test/factories/notification-factory"

describe('Count Recipients Notification', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new inMemoryNotificationsRepository()
    const countRecipientsNotifications = new CountRecipientNotifications(notificationsRepository)

    await notificationsRepository.create(makeNotification({recipientId: 'recipient-1'}))

    await notificationsRepository.create(makeNotification({recipientId: 'recipient-1'}))

    await notificationsRepository.create(makeNotification({recipientId: 'recipient-2'}))

    const {count} = await countRecipientsNotifications.execute({
      recipientId: 'recipient-1'
    })

    expect(count).toEqual(2)
  })
})