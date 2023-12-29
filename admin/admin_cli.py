def list_users():
    print("listing users...")

def add_user():
    print("adding user")

def remove_user():
    print("removiing user")

func_table = {
    1: list_users,
    2: add_user,
    3: remove_user,
    9: lambda : exit(0)
}


def print_menu():

    print("1: List Users")
    print("2: Add User")
    print("3: Remove User")
    print("9: Exit")

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