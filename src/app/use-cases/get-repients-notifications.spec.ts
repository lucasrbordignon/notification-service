import { inMemoryNotificationsRepository } from "../../../test/repositories/in-memory-notifications-repository"
import { makeNotification } from "../../../test/factories/notification-factory"
import { GetRecipentsNotifications } from "./get-recipients-notifications"

describe('Get Recipients Notification', () => {
  it('should be able to get recipient notifications', async () => {
    const notificationsRepository = new inMemoryNotificationsRepository()
    const getRecipentsNotifications = new GetRecipentsNotifications(notificationsRepository)

    await notificationsRepository.create(makeNotification({recipientId: 'recipient-1'}))

    await notificationsRepository.create(makeNotification({recipientId: 'recipient-1'}))

    await notificationsRepository.create(makeNotification({recipientId: 'recipient-2'}))

    const {notifications} = await getRecipentsNotifications.execute({
      recipientId: 'recipient-1'
    })

    expect(notifications).toHaveLength(2)
    expect(notifications).toEqual(expect.arrayContaining([
      expect.objectContaining({ recipientId: 'recipient-1' }),
      expect.objectContaining({ recipientId: 'recipient-1' })
    ]))
  })
})