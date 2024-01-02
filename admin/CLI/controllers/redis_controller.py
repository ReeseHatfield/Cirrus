from CLI.models.redis_client import Redis_Client

# controller layer should handle input validation, error handing, and checks if user exists

def add_user(user_name: str, pass_word: str):
    print(user_name)
    print(pass_word)
    print("add user from controller")

    client = Redis_Client.get_instance()


def get_users():
    client = Redis_Client.get_instance()


def delete_user(user_name: str):
    client = Redis_Client.get_instance()