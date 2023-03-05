import { Content } from "./../../src/app/entities/Content"
import { Notification, NotificationProps } from "./../../src/app/entities/notification"

type Override = Partial<NotificationProps>

export function makeNotification(override: Override = {}) {
  return new Notification({
    category: 'social',
    content: new Content('Nova solicitação de amizade!'),
    recipientId: 'recipient-1',
    ...override
  })
}