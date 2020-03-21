import { NotificationManager } from 'react-notifications';

export const showNotification = (type, description, title) => {
    
    switch (type) {
        case 'info':
            NotificationManager.info(description, title);
            break;
        case 'success':
            NotificationManager.success(description, title);
            break;
        case 'warning':
            NotificationManager.warning(description, title, 3000);
            break;
        case 'error':
            NotificationManager.error(description, title, 5000, () => {
                alert('callback');
            });
        break;

        default: NotificationManager.info('Info message');
        break;
    };
};