#!/usr/bin/env python3

import os

FILE_PATH = 'docs/Credits.md'
PR_AUTHOR = os.getenv('PR_AUTHOR')


def contains_string(file_path, search_string):
    """
    Check if a given string is present in the file at the specified path.

    Args:
    file_path (str): The path to the file to be searched.
    search_string (str): The string to search for within the file.

    Returns:
    bool: True if the search_string is found in the file, False otherwise.

    Raises:
    FileNotFoundError: If the file at file_path does not exist.
    """
    try:
        with open(file_path, 'r') as file:
            contents = file.read()
            return search_string in contents
    except FileNotFoundError:
        print("File not found.")
        return False

def add_contributor():
    """
    Add a contributor to the Credits file if they have not already been added.
    
    This function reads the env variable 'PR_AUTHOR' to determine the
    name of the contributor. It then checks if the contributor is already listed
    in the Credits file, and if not, adds them.
    """

    author_already_contributed = contains_string(FILE_PATH, PR_AUTHOR)

    if author_already_contributed:
        return
    

    write_name_to_file(PR_AUTHOR)


# -----FORMAT------
# - **[{FULLNAME}](https://github.com/{USERNAME})** - {PRs FROM USER}

def format_name(name: str):
    """
    Format the contributor's name as a markdown link with a reference to their contributions.

    Args:
    name (str): The GitHubj username of the contributor.

    Returns:
    str: The formatted markdown string containing the contributor's name and links
    to their GitHub profile and contributions.
    """
    return f'- **[{name}](https://github.com/{name})** - [See Contributions](https://github.com/ReeseHatfield/Cirrus/pulls/{name})'



def write_name_to_file(name: str):
    """
    Append a contributor's name to the Credits file.

    This function formats the contributor's name using `format_name` and then
    appends this formatted name to the Credits file.

    Args:
    name (str): The GitHub username of the contributor to be added to the file.
    """
    line = format_name(name)

    with open(FILE_PATH, 'a+') as credits:
        credits.seek(0, os.SEEK_END) 
        if credits.tell() > 0 and credits.read(1) != '\n':
            credits.write('\n')  
        credits.write(line + '\n')


if __name__ == "__main__":
    add_contributor()