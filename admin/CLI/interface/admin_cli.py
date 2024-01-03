from CLI.controllers import redis_controller
import getpass

def list_users():
    """
    Retrieves all users from a Redis controller and prints them in a readable
    format.
    """
    users = redis_controller.get_all_users()
    # this needs to be put into a more readable format
    print(users)

def add_user():
    """
    Prompts the user for a name and password, and then adds the user to a Redis
    database.
    """
    user_name = input("What is the user's name? ")
    pass_word = getpass.getpass("What is the new user's password? ")

    redis_controller.add_user(user_name, pass_word)

def remove_user():
    """
    Prompts the user to enter the name of a user and then calls 
    `delete_user` from the Redis controller to remove that user.
    """
    user_name = input("What is the name of the user that you would like to remove? ")
    redis_controller.delete_user(user_name)

def get_user_info():
    """
    Prompts the user to enter a name and then retrieves information about
    that user from the Redis controller.
    """
    user_name = input("What is the name of the user? ")
    print(redis_controller.get_user(user_name))

def change_user_password():
    """
    Prompts the user for a username and a new password, and then
    calls the Redis controller to change the password for that user.
    """
    user_name = input("What is the name of the user who you want to change the password? ")
    pass_word = getpass.getpass("What is the new password? ")

    redis_controller.change_password(user_name, pass_word)

def exit_cli():
    """
    Exits the CLI with code 0
    """
    exit()

func_table = {
    1: list_users,
    2: add_user,
    3: remove_user,
    4: get_user_info,
    5: change_user_password,
    6: exit_cli,
}


def format_func_name(dunder_name):
    """
    Formats the function name to a readble format
    with the first letter capitalized
    """
    words = dunder_name.split('_')
        
    capital_first_letter = words[0][0].upper()

    func_name = f"{capital_first_letter}{words[0][1:]}"

    for word in words[1:]:
        func_name += ' ' + word

    return func_name


def print_menu():
    """
    Iterates through all the functions in the function table
    and prints each in a formatted manner to the console
    """

    for index, func in enumerate(func_table.values()):
        name = format_func_name(func.__name__)
        print(f"{index + 1}: {name}") # + 1 to account for 0



def main():
    """
    Entry point of program
    Starts the Admin CLI
    """
    print("Welcome to the Cirrus Administrator Console!")

    while(True):
        print_menu()
        
        try:
            choice = int(input())
            func_table[choice]()
        except (KeyError, ValueError):
            print("Invalid input")




if __name__ == "__main__":
    main()