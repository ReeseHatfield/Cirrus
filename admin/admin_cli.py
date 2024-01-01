def list_users():
    print("listing users...")

def add_user():
    print("adding user")

def remove_user():
    print("removiing user")

def exit_cli():
    exit()

func_table = {
    1: list_users,
    2: add_user,
    3: remove_user,
    9: exit_cli,
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