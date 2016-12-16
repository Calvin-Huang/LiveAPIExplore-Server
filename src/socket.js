import SocketIO from 'socket.io';
import { createClient } from 'redis';

import { redisUrl } from './config';

const io = SocketIO();

io.use((socket, next) => {
  return next();
});

io.of('/live-chatroom')
  .use((socket, next) => {
    return next();
  })
  .on('connection', (socket) => {
    const redisSubscriber = createClient(redisUrl);
    let currentRoom = '';

    socket.on('subscribe', (id) => {
      currentRoom = `live:${id}:comments`;
      socket.join(currentRoom);

      redisSubscriber.subscribe(`${currentRoom}:latest`);

      const redis = createClient(redisUrl);
      redis.exists('live', id, (err, result) => {
        if (result < 2) {
          redis.lpush('live', id);
        }
      });
      redis.quit();

      socket.emit('subscribed');
    });

    redisSubscriber.on('message', (channel, message) => {
      socket.emit('comment', message);
    });

    socket.on('unsubscribe', (id) => {
      socket.leave(id);
      socket.emit('unsubscribed');
    });

    socket.on('disconnect', () => {
      redisSubscriber.unsubscribe(`${currentRoom}:latest`);
      redisSubscriber.quit();
    })
  });

export default io;