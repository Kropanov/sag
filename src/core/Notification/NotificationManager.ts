import { Notification } from '@core/Entities';
import { NotificationWidget } from '@core/Display';
import { INotification } from '@/interfaces';

// TODO: complete logic
export class NotificationManager {
  private uiNotification: NotificationWidget;
  private entity: Notification;

  constructor(uiNotification: NotificationWidget, logic: Notification) {
    this.uiNotification = uiNotification;
    this.entity = logic;
  }

  updateUI() {
    const notifications = this.entity.getNotifications();
    console.log(notifications);
    this.uiNotification.render();
  }

  push(notification: INotification): void {
    this.entity.push(notification);
    this.updateUI();
  }

  pop() {
    this.entity.pop();
    this.updateUI();
  }
}
