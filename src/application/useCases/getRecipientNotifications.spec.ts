import { makeNotification } from '@test/factories/notificationFactory';
import { InMemoryNotificationsRepository } from '@test/repositories/inMemoryNotificationsRepository';
import { GetRecipientNotifications } from './getRecipientNotifications';

describe('Get recipient notifications', () => {
  it('should be able to get the recipient notifications', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const getRecipientNotifications = new GetRecipientNotifications(
      notificationRepository,
    );

    await notificationRepository.create(makeNotification({ recipientId: '1' }));
    await notificationRepository.create(makeNotification({ recipientId: '1' }));
    await notificationRepository.create(makeNotification({ recipientId: '2' }));

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: '1',
    });

    expect(notificationRepository.notifications).toHaveLength(3);
    expect(notifications.length).toEqual(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: '1' }),
        expect.objectContaining({ recipientId: '1' }),
      ]),
    );
  });
});
