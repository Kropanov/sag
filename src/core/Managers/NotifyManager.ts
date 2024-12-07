import { Notification } from '@core/Entities';
import { NotificationBox } from '@core/Display';
import { INotification, IScene } from '@interfaces';

// TODO: rework after ui components refactoring
export class NotifyManager {
  static _instance: NotifyManager;
  private scene!: IScene;
  private entity: Notification = new Notification();
  private uiNotification: NotificationBox = new NotificationBox();

  constructor() {
    if (NotifyManager._instance) {
      return NotifyManager._instance;
    }

    NotifyManager._instance = this;
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
