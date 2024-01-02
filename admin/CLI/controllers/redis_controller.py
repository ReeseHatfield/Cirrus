from CLI.models.redis_client import Redis_Client, RedisException
from CLI.models.security import hash
from redis.exceptions import ConnectionError, TimeoutError

# controller layer should handle input validation, error handing, and checks if user exists


def handle_redis_exception(exception):
    if isinstance(exception, ConnectionError):
        print("Error: Unable to connect to Redis.")
    elif isinstance(exception, TimeoutError):
        print("Error: Timeout while connecting to Redis.")
    elif isinstance(exception, RedisException):
        print(f"Error: Redis command failed: {exception.message}")
    else:
        print("Error: An unexpected error occurred.")

def add_user(user_name: str, pass_word: str):
    
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
    client = Redis_Client.get_instance()

    try:
        result = client.keys()

        if(result):
            return result
        
    except Exception as e:
        handle_redis_exception(e)


def delete_user(user_name: str):
    client = Redis_Client.get_instance()

    try:
        result = client.delete(user_name)
        if(result):
            return result
    except Exception as e:
        handle_redis_exception(e)

def change_password(user_name: str, pass_word: str):
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
    client = Redis_Client.get_instance()

    try:
        result = client.get(user_name)

        if(result):
            return result
    except Exception as e:
        handle_redis_exception(e)



