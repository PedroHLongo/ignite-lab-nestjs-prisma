import { InMemoryNotificationsRepository } from '../../../test/repositories/inMemoryNotificationsRepository';
import { SendNotification } from './sendNotification';

describe('Send notification', () => {
  it('should be able to send a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const sendNotification = new SendNotification(notificationsRepository);

    const { notification } = await sendNotification.execute({
      content: 'This is a notification',
      category: 'social',
      recepientId: 'example-recepient-id',
    });

    console.log(notificationsRepository.notifications);

    expect(notificationsRepository.notifications).toHaveLength(1);
    expect(notificationsRepository.notifications[0]).toEqual(notification);
  });
});
