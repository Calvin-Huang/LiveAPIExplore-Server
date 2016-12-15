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

      io.of('/live-chatroom').in(currentRoom).clients((err, clients) => {
        if (clients.length === 1) {
          redis.subscribe(currentRoom);
        }
      });

      socket.emit('subscribed');
    });

    redis.on('message', (channel, message) => {
      io.of('/live-chatroom').in(channel.replace(':latest', '')).emit('comment', message);
    });

    socket.on('unsubscribe', (id) => {
      socket.leave(id);

      socket.emit('unsubscribed');
    });

    socket.on('disconnect', () => {
      io.of('/live-chatroom').in(currentRoom).clients((err, clients) => {
        if (clients.length === 0) {
          const redis = createClient(redisUrl);
          redis.unsubscribe(currentRoom);
          redis.quit();
        }
      });

      redis.quit();
    })
  });

export default io;