import { makeNotification } from '@test/factories/notificationFactory';
import { InMemoryNotificationsRepository } from '../../../test/repositories/inMemoryNotificationsRepository';
import { CancelNotification } from './cancelNotification';
import { NotificationNotFound } from './errors/notificationNotFoundError';

describe('Cancel notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    const notification = makeNotification();

    await notificationsRepository.create(notification);

    await cancelNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications).toHaveLength(1);
    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    await notificationsRepository.create(makeNotification());

    expect(notificationsRepository.notifications).toHaveLength(1);
    expect(() => {
      return cancelNotification.execute({
        notificationId: 'id-not-in-database',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
