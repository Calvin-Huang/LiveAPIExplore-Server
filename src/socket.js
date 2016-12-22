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
    const redisCommentSubscriber = createClient(redisUrl);
    const redisProductSubscriber = createClient(redisUrl);
    let currentRoom = '';

    socket.on('subscribe', (id) => {
      currentRoom = `live:${id}`;
      socket.join(currentRoom);

      redisCommentSubscriber.subscribe(`${currentRoom}:comments:latest`);
      redisProductSubscriber.subscribe(`${currentRoom}:products:latest`);

      const redis = createClient(redisUrl);
      redis.exists('live', id, (err, result) => {
        if (result < 2) {
          redis.lpush('live', id);
        }

        redis.quit();
      });

      socket.emit('subscribed');
    });

    redisCommentSubscriber.on('message', (channel, message) => {
      socket.emit('comment', message);
    });

    redisProductSubscriber.on('message', (channel, message) => {
      socket.emit('product', JSON.parse(message));
    })

    socket.on('unsubscribe', (id) => {
      socket.leave(id);
      socket.emit('unsubscribed');
    });

    socket.on('disconnect', () => {
      redisCommentSubscriber.unsubscribe(`${currentRoom}:comments:latest`);
      redisCommentSubscriber.quit();

      redisProductSubscriber.unsubscrive(`${currentRoom}:products:latest`);
      redisProductSubscriber.quit();
    })
  });

export default io;