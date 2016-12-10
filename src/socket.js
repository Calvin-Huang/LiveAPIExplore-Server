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

    socket.on('subscribe', (id) => {
      socket.join(`live:${id}:comments`);
      redis.subscribe(`live:${id}:comments:latest`);

      socket.emit('subscribed');
    });

    redis.on('message', (channel, message) => {
      io.of('/live-chatroom').in(channel.replace(':latest', '')).emit('comment', message);
    });

    socket.on('unsubscribe', (id) => {
      redis.unsubscribe(`live:${id}:comments:latest`);
      socket.leave(id);

      socket.emit('unsubscribed');
    });

    socket.on('disconnect', () => {
      redis.quit();
    })
  });

export default io;