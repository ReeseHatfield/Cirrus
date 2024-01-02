from CLI.models.redis_client import Redis_Client, RedisException
from redis.exceptions import ConnectionError, TimeoutError


# controller layer should handle input validation, error handing, and checks if user exists

def add_user(user_name: str, pass_word: str):
    print(user_name)
    print(pass_word)
    print("add user from controller")

    client = Redis_Client.get_instance()


def get_all_users():
    client = Redis_Client.get_instance()


def delete_user(user_name: str):
    client = Redis_Client.get_instance()

def get_user(user_name: str):
    client = Redis_Client.get_instance()

    try:
        result = client.get(user_name)

        if(result):
            return result
    except ConnectionError:
        print("Error: Unable to connect to Redis.")
    except TimeoutError:
        print("Error: Timeout while connecting to Redis.")
    except RedisException as e:
        print(f"Error: Redis command failed: {e.message}")



