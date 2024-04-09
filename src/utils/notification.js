import { NotificationManager } from "react-notifications";

export const INFO_NOTI = 'info';

export const SUCCESS_NOTI = 'success';

export const WARNING_NOTI = 'warning';

export const ERROR_NOTI = 'error';

export const createNotification = (type, message, title, errorCallback = () => {
    alert('Error occured');
}) => {
  switch (type) {
    case INFO_NOTI:
      NotificationManager.info(message);
      break;
    case SUCCESS_NOTI:
      NotificationManager.success(message, title);
      break;
    case WARNING_NOTI:
      NotificationManager.warning(message, title, 3000);
      break;
    case ERROR_NOTI:
      NotificationManager.error(message, 'Click me!', 5000, errorCallback);
      break;
    default: 
      NotificationManager.info(message);
      break;
  }
};
