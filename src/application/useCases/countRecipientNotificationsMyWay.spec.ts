import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { InMemoryNotificationsRepository } from '@test/repositories/inMemoryNotificationsRepository';
import { CountRecipientNotifications } from './countRecipientNotificationsMyWay';

describe('Count recipient notifications', () => {
  it('should be able to count the number of notifications based on a recipientId', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );

    await notificationsRepository.create(
      new Notification({
        category: 'social',
        content: new Content('New friend request!'),
        recipientId: '1',
      }),
    );

    await notificationsRepository.create(
      new Notification({
        category: 'social',
        content: new Content('New friend request!'),
        recipientId: '2',
      }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: '1',
    });

    expect(notificationsRepository.notifications).toHaveLength(2);
    expect(count).toEqual(1);
  });

  it('should return 0 when didnt find any notification based on recipiendId', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );

    const notification = new Notification({
      category: 'social',
      content: new Content('New friend request!'),
      recipientId: 'example-recipient-id',
    });

    await notificationsRepository.create(notification);

    const { count } = await countRecipientNotifications.execute({
      recipientId: '1',
    });

    expect(notificationsRepository.notifications).toHaveLength(1);
    expect(count).toEqual(0);
  });
});
