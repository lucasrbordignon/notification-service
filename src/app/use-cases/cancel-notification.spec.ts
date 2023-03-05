import { inMemoryNotificationsRepository } from "../../../test/repositories/in-memory-notifications-repository"
import { CancelNotification } from './cancel-notifications'
import { NotificationNotFound } from "./errors/notification-not-found"
import { makeNotification } from "../../../test/factories/notification-factory"

describe('Send notification', () => {
  it('should be able to send a notification', async () => {
    const notificationsRepository = new inMemoryNotificationsRepository()
    const cancelNotification = new CancelNotification(notificationsRepository)

    const notification = makeNotification()

    await notificationsRepository.create(notification)

    await cancelNotification.execute({
      notificationId: notification.id
    })

    expect(notificationsRepository.notifications[0].cancelAt).toEqual(expect.any(Date))
  })

  it('should not be able to cancel a non exist notification', async () => {
    const notificationsRepository = new inMemoryNotificationsRepository()
    const cancelNotification = new CancelNotification(notificationsRepository)

    expect(() => {
      return cancelNotification.execute({
        notificationId: 'fake-notification-id'
      })
    }).rejects.toThrow(NotificationNotFound)
  })
})