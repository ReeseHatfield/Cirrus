import redis

# Model class (singleton) for interacting with the Redis server.
# This class wraps alot of the built in redis SDK functions
# With the benefit of being a singleton, better access control, and preventing callers 
# from editing pairs in the database that they should not have access to 
class Redis_Client:

    _instance = None
    db = redis.StrictRedis(host='localhost', port=6379, db=0)

    
    def __init__(self):
        """
        Singleton pattern contructor for redis client
        """
        if Redis_Client._instance == None:
            Redis_Client._instance = self
        else:
            raise Exception("Cannot create another instance of singleton")
    
    @staticmethod
    def get_instance():
        """
        Returns an instance of redis_client, creating one if it
        doesn't already exist.
        :return: an instance of the `redis_client` class.
        """
        if(Redis_Client._instance == None):
            Redis_Client._instance = Redis_Client()

        return Redis_Client._instance


    def set(self, key, value):
        """
        Set a key-value pair in the Redis database and raises an exception if the SET
        command returns 'None'.
        
        :param key: Identifier for the value that you want to set in the
        database. 
        :param value: The value that you want to associate with the given key in
        the Redis database
        :return: The result of the set command
        """
        result = self.db.set(key, value)

        if(result is None):
            raise RedisException("SET command returned 'None'")

        return result

    def get(self, key):
        """
        Retrieves a value from a Redis database using a given key and raises an exception
        if the result is None.
        
        :param key: The key of the data that you want to retrieve from the
        database
        :return: The result of the `GET` command 
        """
        result = self.db.get(key)

        if(result is None):
            raise RedisException("GET command returned 'None'")
        
        return result
    

    def exists(self, key):
        """
        Checks if a key exists in the Redis database and raises an exception if the result is
        'None'.
        
        :param key: Key that you want to check for existence in the Redis
        database
        :return: The result of the `self.db.exists(key)` call.
        """
        result = self.db.exists(key)

        if(result is None):
            raise RedisException("EXISTS command returned 'None'")
        
        return result
    
    def keys(self):
        """
        Returns the keys in a Redis database, raising an exception if the result is None.
        :return: The result of the `self.db.keys()` command.
        """
        result = self.db.keys()

        if(result is None):
            raise RedisException("KEYS command returned 'None'")
        
        return result
    
# An exception class used to handle errors related to the Redis model if values are None, or other cases if needed.
class RedisException(Exception):
    def __init__(self, message: str):
        """
        Initialize a custom exception with the of the failed redis command
        
        :param message: Message to pass
        :type message: str
        """
        self.message = message
        super().__init__(self.message)

    def __str__(self):
        return f"RedisException: a redis command failed with message'{self.message}'"