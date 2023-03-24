import axios from 'axios';

export const sendNotification = async name =>
  await axios.post(
    '/notifications',
    { name }
  );
