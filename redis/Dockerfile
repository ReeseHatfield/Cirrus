FROM redis

# copy conf file over
COPY redis.conf /usr/local/etc/redis/redis.conf

# run server
CMD [ "redis-server", "/usr/local/etc/redis/redis.conf" ]