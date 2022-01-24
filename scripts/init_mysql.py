# This python script is for initializing the database you 
# have created by adding tables that the web app will use

import mysql.connector # pip3 install mysql-connector-python
from mysql.connector import errorcode
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

TABLES = {}
TABLES["test_group"] = (
    "CREATE TABLE `test_group` ("
    "  `ID` varchar(40) UNIQUE NOT NULL,"
    "  PRIMARY KEY (`ID`)"
    ")"
)

TABLES["participant"] = (
    "CREATE TABLE `participant` ("
	"  `ID` int AUTO_INCREMENT,"
    "  `Is18` bool NOT NULL,"
    "  `IsHearing` bool NOT NULL,"
    "  `ListeningDevice` int NOT NULL,"
    "  `IsQuietEnv` bool NOT NULL,"
    "  PRIMARY KEY (`ID`)"
    ")"
)

TABLES["survey"] = (
    "CREATE TABLE `survey` ("
	"  `ID` int AUTO_INCREMENT,"
    "  `ParticipantID` int,"
    "  `DateTaken` timestamp DEFAULT CURRENT_TIMESTAMP,"
    "  PRIMARY KEY (`ID`),"
    "  FOREIGN KEY (`ParticipantID`) REFERENCES `participant`(`ID`)"
    ")"
)

TABLES["question"] = (
    "CREATE TABLE `question` ("
	"  `TestGroupID` varchar(40),"
    "  `SurveyID` int,"
    "  `OrderAsked` int,"
    "  `TimesAsked` int DEFAULT 0,"
    "  FOREIGN KEY (`TestGroupID`) REFERENCES `test_group`(`ID`),"
    "  FOREIGN KEY (`SurveyID`) REFERENCES `survey`(`ID`)"
    ')'
)

TABLES["soundfile"] = (
    "CREATE TABLE `soundfile` ("
    "  `ID` int AUTO_INCREMENT,"
    "  `TestGroupID` varchar(40),"
    "  `Filename` varchar(50) UNIQUE NOT NULL,"
    "  `IsReference` bool NOT NULL,"
    "  `IsBaseline` bool NOT NULL,"
    "  `IsExperimental` bool NOT NULL,"
    "  `TimesSelected` int DEFAULT 0,"
    "  PRIMARY KEY (`ID`),"
    "  FOREIGN KEY (`TestGroupID`) REFERENCES `test_group`(`ID`)"
    ")"
)

TABLES["response"] = (
    "CREATE TABLE `response` ("
	"  `SoundFileID` int,"
    "  `SurveyID` int,"
    "  `OrderAsked` int,"
    "  FOREIGN KEY (`SoundFileID`) REFERENCES `soundfile`(`ID`),"
    "  FOREIGN KEY (`SurveyID`) REFERENCES `survey`(`ID`)"
    ")"
)

for table_name in TABLES:
    table_description = TABLES[table_name]
    try:
        print("Creating table {}... ".format(table_name), end='')
        mycursor.execute(table_description)
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_TABLE_EXISTS_ERROR:
            print("already exists.")
        else:
            print(err.msg)
    else:
        print("OK")

mycursor.close()
mydb.close()