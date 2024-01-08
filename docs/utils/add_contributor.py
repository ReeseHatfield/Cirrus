#!/usr/bin/env python3

import os

FILE_PATH = 'docs/Credits.md'
PR_AUTHOR = os.getenv('PR_AUTHOR')


# -----FORMAT------
# - **[{FULLNAME}](https://github.com/{USERNAME})** - {PRs FROM USER}


def contains_string(file_path, search_string):
    try:
        with open(file_path, 'r') as file:
            contents = file.read()
            return search_string in contents
    except FileNotFoundError:
        print("File not found.")
        return False

def add_contributor():

    author_already_contributed = contains_string(FILE_PATH, PR_AUTHOR)

    if author_already_contributed:
        return
    

    write_name_to_file(PR_AUTHOR)

def format_name(name: str):
    return f'- **[{name}](https://github.com/{name})** - [See Contributions](https://github.com/ReeseHatfield/Cirrus/pulls/{name})'



def write_name_to_file(name: str):
    line = format_name(name)

    with open(FILE_PATH, 'a') as credits:
        credits.writelines(line)


if __name__ == "__main__":
    add_contributor()