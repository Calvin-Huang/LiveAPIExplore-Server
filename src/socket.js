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
    const redis = createClient(redisUrl);
    let currentRoom = '';

    socket.on('subscribe', (id) => {
      currentRoom = `live:${id}:comments`;
      socket.join(currentRoom);

      redis.subscribe(`${currentRoom}:latest`);

      redis.exists('live', id, (err, result) => {
        if (result < 2) {
          redis.lpush('live', id);
        }
      });

      socket.emit('subscribed');
    });

    redis.on('message', (channel, message) => {
      socket.emit('comment', message);
    });

    socket.on('unsubscribe', (id) => {
      socket.leave(id);
      socket.emit('unsubscribed');
    });

    socket.on('disconnect', () => {
      redis.unsubscribe(`${currentRoom}:latest`);
      redis.quit();
    })
  });

export default io;