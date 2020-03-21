import React from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import 'react-notifications/lib/notifications.css';

class Notification extends React.Component {

    render() {
        return (
            <div>
                <NotificationContainer />
            </div>
        );
    };
};

export default Notification;