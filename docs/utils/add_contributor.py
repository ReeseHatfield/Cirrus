#!/usr/bin/env python3

import os

FILE_PATH = '../Credits.md'
PR_AUTHOR = os.getenv('PR_AUTHOR')


# -----FORMAT------
# - **[{FULLNAME}](https://github.com/{USERNAME})** - {PRs FROM USER}

def add_contributor():
    write_name_to_file(PR_AUTHOR)


# Test changes 1


def write_name_to_file(string: str):
    with open(FILE_PATH, 'a') as credits:
        credits.write(string)


if __name__ == "__main__":
    add_contributor()