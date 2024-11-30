import { Notification } from '@core/Entities';
import { NotificationWidget } from '@core/Display';
import { INotification, IScene } from '@/interfaces';

// TODO: rework after ui components refactoring
export class NotificationManager {
  static _instance: NotificationManager;
  private scene!: IScene;
  private entity: Notification = new Notification();
  private uiNotification: NotificationWidget = new NotificationWidget();

  constructor() {
    if (NotificationManager._instance) {
      return NotificationManager._instance;
    }

    NotificationManager._instance = this;
  }

  setScene(scene: IScene) {
    console.log(scene);
    this.scene = scene;
    console.log(this.scene);
  }

  updateUI() {
    this.entity.getNotifications();
    this.uiNotification.update();
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
