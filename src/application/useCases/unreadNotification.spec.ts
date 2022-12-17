import { makeNotification } from '@test/factories/notificationFactory';
import { InMemoryNotificationsRepository } from '@test/repositories/inMemoryNotificationsRepository';
import { NotificationNotFound } from './errors/notificationNotFoundError';
import { UnreadNotification } from './unreadNotification';

describe('Unread notification', () => {
  it('should be able to unread a notification', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(notificationRepository);

    const notification = makeNotification({ readAt: new Date() });

    await notificationRepository.create(notification);

    await unreadNotification.execute({ notificationId: notification.id });

    expect(notificationRepository.notifications).toHaveLength(1);
    expect(notificationRepository.notifications[0].readAt).toBeNull();
  });

  it('should not be able to unread a non existing notification', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(notificationRepository);

    await notificationRepository.create(makeNotification());

    expect(notificationRepository.notifications).toHaveLength(1);
    expect(() => {
      return unreadNotification.execute({
        notificationId: 'id-not-ind-database',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
