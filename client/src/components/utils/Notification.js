import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';

const notification = (type, message, title, position = 'top-left') => {
  return store.addNotification({
    title: title,
    message: message,
    type: type,
    insert: 'top',
    container: position,
    animationIn: ['animated', 'fadeIn'],
    animationOut: ['animated', 'fadeOut'],
    dismiss: {
      duration: 5000,
      onScreen: true
    }
  });
};

export default notification;
