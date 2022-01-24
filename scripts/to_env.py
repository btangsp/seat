# This python scripts helps you save your config info 
# as environment variables to use for local dev

import sys
import re

def parse(s):
  regex = '[/@?:]'
  user, pass_, host, dbname, _ = re.split(regex,s[8:])
  return user, pass_, host, dbname

user_input = 'x'
# dbname, host, user, password = ''
f = open('.env', 'w')

while user_input not in ['Y', 'y', 'N', 'n', '']:
    user_input = input("Are you using Heroku? [Y/n] ")
    if user_input in ['Y', 'y', '']:
        user, password, host, dbname = parse(input("Enter your CLEARDB_DATABASE_URL: "))
    elif user_input in ['N', 'n']:
        dbname = input("Enter the Database Name: ")
        host = input("Enter the Host URL: ")
        user = input("Enter Your Username: ")
        password = input("Enter Your Password: ")
    else:
        print(user_input, " is not a valid input.")

f.write("MYSQL_DBNAME = " + dbname + "\n")
f.write("MYSQL_HOST = " + host + "\n")
f.write("MYSQL_USER = " + user + "\n")
f.write("MYSQL_PASS = " + password)

f = open('.env', 'r')
print('\nThe configuration information you have entered is as follows:')
print(f.read(), '\n')
f.close()