# This python script shows you all the data that has been 
# collected from the user tests and saved in your database

import mysql.connector # pip3 install mysql-connector-python
import os
from dotenv import load_dotenv # pip3 install python-dotenv
import csv
from datetime import datetime

load_dotenv()

dirExists = os.path.exists('results')

if not dirExists:
	os.mkdir('results')

mydb = mysql.connector.connect(
	host=os.environ.get('MYSQL_HOST'),
	user=os.environ.get('MYSQL_USER'),
	password=os.environ.get('MYSQL_PASS'),
	database=os.environ.get('MYSQL_DBNAME')
)

mycursor = mydb.cursor()

table_names = ['test_group', 'participant', 'survey', 'question', 'soundfile', 'response']

datestring = datetime.now().strftime("%Y%m%d_%Hh%Mm%Ss")
os.mkdir('results/' + datestring)

for table in table_names:

	mycursor.execute("SELECT * FROM " + table)
	myresult = mycursor.fetchall()

	if len(myresult) == 0:
		print("Table \"" + table + "\" is empty. No csv file generated.")
	else:
		filepath = './results/' + datestring + '/' + datestring + '_' + table + '.csv'
		print("Writing table \"" + table + "\" to " + filepath)
		
		mycursor.execute("SHOW COLUMNS FROM " + table)
		header = [column[0] for column in mycursor.fetchall()]

		fp = open(filepath, 'x')
		myFile = csv.writer(fp)
		myFile.writerow(header)
		myFile.writerows(myresult)
		fp.close()