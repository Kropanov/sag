import { INotification } from '@/interfaces';

export class Notification {
  public notifications: INotification[] = [];
  private duration = 5000;

  getNotifications(): INotification[] {
    return this.notifications;
  }

  push(notification: INotification) {
    this.notifications.push(notification);
    setTimeout(() => this.pop(), this.duration);
  }

  pop() {
    this.notifications.shift();
  }
}
