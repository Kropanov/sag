import { NotificationTypeEnum } from '@enums';

export interface INotification {
  id: string;
  message: string;
  type: NotificationTypeEnum;
}
