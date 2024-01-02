from CLI.controllers import redis_controller
import getpass

def list_users():
    print(redis_controller.get_all_users())

def add_user():
    user_name = input("What is the user's name? ")
    pass_word = getpass.getpass("What is the new user's password? ")

    redis_controller.add_user(user_name, pass_word)

def remove_user():
    user_name = input("What is the name of the user that you would like to remove? ")
    redis_controller.delete_user(user_name)

def get_user_info():
    user_name = input("What is the name of the user? ")
    print(redis_controller.get_user(user_name))

def exit_cli():
    exit()

func_table = {
    1: list_users,
    2: add_user,
    3: remove_user,
    4: get_user_info,
    5: exit_cli,
}


def format_func_name(dunder_name):
    words = dunder_name.split('_')
        
    capital_first_letter = words[0][0].upper()

    func_name = f"{capital_first_letter}{words[0][1:]}"

    for word in words[1:]:
        func_name += ' ' + word

    return func_name


def print_menu():

    for index, func in enumerate(func_table.values()):
        name = format_func_name(func.__name__)
        print(f"{index + 1}: {name}") # + 1 to account for 0



def main():
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