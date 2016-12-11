import { expect } from 'chai';
import { createClient } from 'redis';
import io from 'socket.io-client';

import server from './socket';
import { redisUrl } from './config';

describe('socket', () => {
  const commentMessage = 'Received comment!!';

  const redis = createClient(redisUrl);

  before(async () => {
    server.listen(5000);
  });

  after(() => {
    redis.lrem('live:1:comments', -1, commentMessage);
    redis.quit();
  });

  it('should receive message from subscribed live room', (done) => {
    const client = io.connect('http://localhost:5000/live-chatroom');

    client.on('connect', () => {
      client.on('comment', (message) => {
        expect(message).to.be.eq(commentMessage);

        client.disconnect();
        done();
      });

      client.on('subscribed', () => {

        // Publish comment.
        redis.rpush('live:1:comments', commentMessage);
        redis.publish('live:1:comments:latest', commentMessage);
      });

      client.emit('subscribe', '1');
    });
  });

  it('multi client should receive message from subscribed live room', (done) => {
    let finishedCount = 0;
    for (let i = 0; i < 4; i++) {
      const client = io.connect('http://localhost:5000/live-chatroom');

      client.on('connect', () => {
        client.on('comment', (message) => {
          expect(message).to.be.eq(commentMessage);

          finishedCount += 1;

          client.disconnect();
           if (finishedCount == 4) {
             done();
           }
        });

        client.on('subscribed', () => {
          finishedCount += 1;

          // Wait all clients subscribed.
          if (finishedCount == 4) {
            finishedCount = 0;

            // Publish comment.
            redis.rpush('live:1:comments', commentMessage);
            redis.publish('live:1:comments:latest', commentMessage);
          }
        });

        client.emit('subscribe', '1');
      });
    }
  });

  it('client should receive message from their subscribed live room', (done) => {
    let finishedCount = 0;
    for (let i = 0; i < 4; i++) {
      const client = io.connect('http://localhost:5000/live-chatroom');

      client.on('connect', () => {
        client.on('comment', (message) => {
          expect(message).to.be.eq(commentMessage);

          finishedCount += 1;

          client.disconnect();
          if (finishedCount == 3) {
            done();
          }
        });

        client.on('subscribed', () => {
          finishedCount += 1;

          // Wait all clients subscribed.
          if (finishedCount == 4) {
            finishedCount = 0;

            // Publish comment.
            redis.rpush('live:1:comments', commentMessage);
            redis.publish('live:1:comments:latest', commentMessage);
          }
        });

        if (finishedCount == 4) {
          client.emit('subscribe', '2');
        } else {
          client.emit('subscribe', '1');
        }
      });
    }
  });
});