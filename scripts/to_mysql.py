# This python script uploads all the audio sample 
# information to your database

import mysql.connector # pip3 install mysql-connector-python
import json
import os # removes file extension
from dotenv import load_dotenv # pip3 install python-dotenv

load_dotenv()

mydb = mysql.connector.connect(
	host=os.environ.get('MYSQL_HOST'),
	user=os.environ.get('MYSQL_USER'),
	password=os.environ.get('MYSQL_PASS'),
	database=os.environ.get('MYSQL_DBNAME')
)

mycursor = mydb.cursor()

file = open('./client/src/json/abx.json',)
data = json.load(file)
file.close()

val = []
names = []

for group in data['filenames']:
	groupName = os.path.splitext(group['reference'])[0]
	names.append((groupName,))
	val.append((groupName, group['reference'], 1, 0, 0))
	val.append((groupName, group['baseline'], 0, 1, 0))
	val.append((groupName, group['experimental'], 0, 0, 1))

sql = "INSERT INTO test_group (ID) VALUES (%s) ON DUPLICATE KEY UPDATE ID=ID"
mycursor.executemany(sql, names)

mydb.commit()

print(mycursor.rowcount, "record inserted into test_group.")

sql = "INSERT INTO soundfile (TestGroupID, Filename, IsReference, IsBaseline, IsExperimental) VALUES (%s, %s, %s, %s, %s) ON DUPLICATE KEY UPDATE TestGroupID=TestGroupID, Filename=Filename, IsReference=IsReference, IsBaseline=IsBaseline, IsExperimental=IsExperimental"
mycursor.executemany(sql, val)

mydb.commit()

print(mycursor.rowcount, "record inserted into soundfile.")