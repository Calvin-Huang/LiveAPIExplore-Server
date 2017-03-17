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

    socket.on('subscribe', (live) => {
      const { liveId, videoId } = live;

      currentRoom = `live:${videoId}`;
      socket.join(currentRoom);

      redisCommentSubscriber.subscribe(`${currentRoom}:comments:latest`);
      redisProductSubscriber.subscribe(`${currentRoom}:products:latest`);

      const redis = createClient(redisUrl);
      redis.sadd('live', JSON.stringify(live), (err, result) => {
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

    socket.on('unsubscribe', (live) => {
      const { liveId, videoId } = live;

      socket.leave(videoId);
      socket.emit('unsubscribed');
    });

    socket.on('disconnect', () => {
      redisCommentSubscriber.unsubscribe(`${currentRoom}:comments:latest`);
      redisCommentSubscriber.quit();

      redisProductSubscriber.unsubscribe(`${currentRoom}:products:latest`);
      redisProductSubscriber.quit();
    })
  });

export default io;