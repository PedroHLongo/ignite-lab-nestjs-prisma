import { makeNotification } from '@test/factories/notificationFactory';
import { InMemoryNotificationsRepository } from '../../../test/repositories/inMemoryNotificationsRepository';
import { CountRecipientNotifications } from './countRecipientNotificationsMyWay';

describe('count recipients notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: '1' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: '1' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: '2' }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: '1',
    });

    expect(notificationsRepository.notifications).toHaveLength(3);
    expect(count).toEqual(2);
  });
});
