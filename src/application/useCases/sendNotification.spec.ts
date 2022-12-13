import { SendNotification } from './sendNotification';

describe('Send notification', () => {
  it('should be able to send a notification', async () => {
    const sendNotification = new SendNotification();

    const { notification } = await sendNotification.execute({
      content: 'This is a notification',
      category: 'social',
      recepientId: 'example-recepient-id',
    });

    //Persistir essa notificação no banco

    expect(notification).toBeTruthy();
  });
});
