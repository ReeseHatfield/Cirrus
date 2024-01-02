from CLI.models.redis_client import Redis_Client, RedisException
from CLI.models.security import hash
from redis.exceptions import ConnectionError, TimeoutError

# controller layer should handle input validation, error handing, and checks if user exists


def handle_redis_exception(exception):
    """
    Handles different types of Redis exceptions and prints
    corresponding error messages.
    
    :param exception: The exception object that is raised when an error
    occurs while interacting with Redis
    """
    if isinstance(exception, ConnectionError):
        print("Error: Unable to connect to Redis.")
    elif isinstance(exception, TimeoutError):
        print("Error: Timeout while connecting to Redis.")
    elif isinstance(exception, RedisException):
        print(f"Error: Redis command failed: {exception.message}")
    else:
        print("Error: An unexpected error occurred.")

def add_user(user_name: str, pass_word: str):
    """
    Adds a new user to a Redis database with their username and hashed password.
    
    :param user_name: A string representing the username of the user to be added
    :type user_name: str
    :param pass_word: A string that represents the password for the user
    :type pass_word: str
    :return: the result of the Redis `set` operation.
    """
    
    client = Redis_Client.get_instance()

    if(client.exists(user_name)):
        print("Error: user already exists")
        return
    
    hashed_password, raw_salt = hash(pass_word)

    try:
        result = client.set(user_name, f"{hashed_password},{raw_salt}")

        if(result):
            return result
    except Exception as e:
        handle_redis_exception(e)
        


def get_all_users():
    """
    Retrieves all keys from a Redis client instance and returns them as a
    result.
    :return: the result of the Redis `keys()` method, which is a list of all keys in the Redis database.
    """
    client = Redis_Client.get_instance()

    try:
        result = client.keys()

        if(result):
            return result
        
    except Exception as e:
        handle_redis_exception(e)


def delete_user(user_name: str):
    """
    Deletes a user from a Redis database using the provided user name.
    
    :param user_name: The `user_name` parameter is a string that represents the name of the user to be
    deleted from the Redis database
    :type user_name: str
    :return: The result of the `client.delete(user_name)`
    operation.
    """
    client = Redis_Client.get_instance()

    try:
        result = client.delete(user_name)
        if(result):
            return result
    except Exception as e:
        handle_redis_exception(e)

def change_password(user_name: str, pass_word: str):
    """
    Change the password for a user in the Redis database.
    
    :param user_name: A string representing the username of the user whose password needs to be changed
    :type user_name: str
    :param pass_word: The `pass_word` parameter is a string that represents the new password that the
    user wants to set
    :type pass_word: str
    :return: the result of the Redis `set` operation.
    """
    client = Redis_Client.get_instance()

    try:
        if(not client.exists(user_name)):
            print(f"Error: user {user_name} does not exist")
            return
        

        hashed_password, raw_salt = hash(pass_word)
        
        result = client.set(user_name, f"{hashed_password},{raw_salt}")

        if(result):
            return result
        
    except Exception as e:
        handle_redis_exception(e)

def get_user(user_name: str):
    """
    Retrieves a user from a Redis database using the provided username.
    
    :param user_name: A string representing the username of the user we want to retrieve from the Redis
    database
    :type user_name: str
    :return: the value associated with the given user_name key in the Redis database.
    """
    client = Redis_Client.get_instance()

    try:
        result = client.get(user_name)

        if(result):
            return result
    except Exception as e:
        handle_redis_exception(e)



