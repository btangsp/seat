# The Subjective Evaluation of Audio Tool (SEAT)

The Subjective Evaluation of Audio Tool (SEAT) is a framework for building subjective audio evaluations that will be deployed on crowdworker platforms like [Amazon Mechanical Turk](https://www.mturk.com/) and [Prolific](https://www.prolific.co/).

Currently, SEAT supports [ABX](https://en.wikipedia.org/wiki/ABX_test) comparisons, but A/B, MUSHRA and other tests are coming soon!

Main advantage of SEAT is that it includes the following within the same app:
 * Modular code allows easy customization
 * Question order is automatically shuffled randomly with each questionnaire.
 * The ability to make an experiment by batch uploading audio files, rather than one-by-one
 * It is easy to modify the wording/language of the question text by modifying a json file
 * Having a database allows you to store all your collected data in the same place for easier analysis

More information on installing and using SEAT follows.

# Intended Users

Everyone is welcome to use and try this app out. However, this tool was designed for the following people:
* Audio researchers interested in administrating subjective audio evaluations to gain feedback on their audio output
* Basic coding skills

Skills that would be beneficial to have:
* Javascript (React.js/Node.js)
* SQL Database
* Servers
* API Endpoints
* Hosting/Deploying Websites
* HTML/CSS

# General Walkthrough for Using SEAT
* [Download & Install](#installation)
* [Upload Audio Samples into Respective Directories](#editing)
* [Edit JSON File: to tailor the questions to your specific survey topic](#editing-the-audio-files)
* \[Optional\] Edit React.js Files: to further customize or append new features that have not already been implemented
* [Create Database](#database)
* \[Recommended\] Test Code Prior to Deploying
* [Deploy to Website](#deploying)
* [Create Survey/HIT on Crowd-Sourcing Platform](#connecting-to-a-crowd-sourcing-platform)
* [View Results](#obtaining-your-results)

# Installation

First, install Git here if you haven't already: [https://git-scm.com/book/en/v2/Getting-Started-Installing-Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

Clone the git repository for SEAT by running:

`git clone [git repo url]`

[Download Node.js](https://nodejs.org/en/) in order to run `npm` commands. You can check that your installation has worked by running `npm` in the command line tool of your choosing.

### Front-End (React.js)

To install all the required npm packages in the `client` directory, run the following command:

`cd client/ && npm install` or `cd client/ && npm i`

Then, you can run:

`cd client/ && npm start`

The command runs the app in the development mode.
If the app does not automatically launch, open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors (programmatic and stylistic errors that were automatically caught) in the console.

In the `client` directory, to build the app for production to the `build` folder, you should run the following command:

`npm run build`

It correctly bundles React in production mode and optimizes the build for the best performance. It also allows the front end to be executed from the root directory, which also includes the server (Node.js).

Your app is ready to be deployed!

### Back-End (Node.js)

In the root directory, run the following to install all the npm packages needed:

`npm install` or `npm i`

**NOTE:** this `npm install` is different from the one you ran earlier in the `client` directory, so both commands are necessary.

Then, to run the server locally, you can run:

`npm run dev`

### Python Scripts

To run the python scripts, install Python3 on your computer using [this guide](https://realpython.com/installing-python/). Run the following command to install the required packages:

`pip install -r requirements.txt`

### Database

We believe any MySQL database is compatible with SEAT. However, we recommend using Heroku's ClearDB add-on on Heroku.  Learn more about ClearDB here: [about ClearDB](https://www.cleardb.com/developers/platform/overview). We have confirmed that it is also possible to host the Node.js backend on Heroku while using AWS MySQL.

#### Heroku MySQL Database

To set up, I recommend following this [YouTube Tutorial](https://youtu.be/aEm0BN493sU) from 0:33 to 2:55. The rest of the tutorial is good for debugging purposes.

Be sure to record your `CLEARDB_DATABASE_URL`, which you can find in your "Config Vars" section under the "Settings" tab of your app.

⚠️ Do NOT share your database configuration with anyone else

Save your database configuration information as environmental variables by running the following command in the root directory:

`python scripts/to_env.py`

#### AWS MySQL Database

I recommend following this [YouTube Tutorial](https://www.youtube.com/watch?v=Ng_zi11N4_c&ab_channel=BeABetterDev). 

If you're using AWS MySQL, you can find your database's host URL by navigating to your AWS database page and clicking on the "Connectivity & security" tab. Within, you should see an "Endpoint" subtitle with your host URL beneath.

Be sure to record the following:
* database name (If you need help finding the database name in Heroku, follow these [directions](#heroku-mysql-database))
* host URL
* username
* password

⚠️ Do NOT share your database configuration with anyone else

Save your database configuration information as environmental variables by running the following command in the root directory:

`python scripts/to_env.py`

#### Initializing Your Database

Once you are finished with creating the database and saving the configuration information, run the following command from the root directory to initialize your database with the tables that are required to store the information that will be entered by your participants when they fill out the audio evaluation:

`python scripts/init_mysql.py`

To learn more about `.env` files, check out this [YouTube tutorial](https://youtu.be/txGL-Ld9zD8). (Please note that it doesn't matter that the tutorial uses the environment variables in a `.php` file, the `.env` should still have the same format.)

# Editing

#### Editing the User-Interface Text

If you wish to change the text displayed in the app, you may do so by editing `client/src/json/text.json`

#### Editing the Inclusion Criteria

If you wish to change the qualification questions, you may do so by editing the values associated with `qual_questions` in `client/src/json/text.json`. By adding or removing items from the list, you can change the questions you want to ask your participants. The subjective audio evaluation tool will send your participants to an "early-end" screen if they do not answer the qualification questions correctly, so make sure to specify which of the possible answers is correct with the `answer` field.

#### Editing the Audio Files

In order to upload and use your own audio files, navigate to the `client/public/user-studies/test-abx/audio` directory and drop files into their respective folders--A, B, or X. Please utilize the following file naming convention:
- X: base_name.wav (For example, npmd_002.wav)
- A: base_name_A.wav (For example, npmd_002_baseline.wav)
- B: base_name_B.wav (For example, npmd_002_experimental.wav)

After all the files has been copied over or moved into the folders, run the python script `to_json.py` by running the following command from the root directory:

`python scripts/to_json.py`

# Deploying

There are several ways to deploying/hosting the React web app with the Node.js server. Some free and easy-to-setup options include, but are not limited to, the following:
- [Heroku](#deploying-to-heroku)
- [Amazon](https://towardsdatascience.com/how-to-use-aws-amplify-to-deploy-a-react-application-ae93cd6e4525)
- [Github](https://medium.com/mobile-web-dev/how-to-build-and-deploy-a-react-app-to-github-pages-in-less-than-5-minutes-d6c4ffd30f14)
- [Firebase](https://medium.com/swlh/how-to-deploy-a-react-app-with-firebase-hosting-98063c5bf425)

### Deploying to Heroku

To deploy the Node.js server, follow the following steps:
1) Sign-in (or create an account if you have not already)
2) Select the app you created earlier for the database (If you did not choose ClearDB as your database, you will need to create a new app here)
3) Under the 'Deploy' tab, select 'Github' in the 'Deployment method' section, connect your Github account, and select the repository that you want to connect (whether you select automatic or manual deploy is up to you). For the repository to show up, you must either fork this repository or create your own repository and initiating it with the cloned repository. It is also possible to just use Heroku CLI by following the directions listed under the 'Deploy' tab or your app on Heroku.
4) Under the 'Settings' tab, find the 'Buildpacks' section and add the 'heroku/nodejs' buildpack
5) Under the 'Settings' tab, find the 'Config Vars' section and click 'Reveal Config Vars' and add environment variables using the values you have saved earlier when creating the database. The key names will be as follows: `MYSQL_DBNAME`, `MYSQL_HOST`, `MYSQL_PASS`, and `MYSQL_USER` (You can find these in the `.env` file that you created earlier)
6) If you have not set-up automatic deployment in Step 2, manually deploy the app now
7) To ensure you have successfully deployed the server, I recommend using [postman.com](https://www.postman.com/) and calling the API endpoints or you can enter in the API endpoint directly into your browser. An example would be "your-nodejs-server-URL/api/participant". You can find your Node.js server URL by going to the 'Settings' tab and looking at the 'Domains' section. If you would like to use Postman, check out the [troubleshooting section](#back-end-troubleshooting).

If you made changes to your code, save your changes and then redeploy them to your Heroku web app by using the following command:

`git push heroku main`

# Connecting to a Crowd-Sourcing Platform

Where you choose to collect data is ultimately up to you. The platforms we chose to use are Amazon Mechanical Turk and Prolific. 

Prior to each survey you deploy, you must first enter the audio samples you are using into the database by running the following command:
`python scripts/to_mysql.py`

### Prolific

[Prolific](https://www.prolific.co/) is an alternative crowd-sourcing platform to MTurk. As of today (2021), Prolific has a smaller participant population, but offers a cheaper alternative---especially if you're interested in setting demographics filters.

To integrate the web app with Prolific, 
1) [Create an account or sign-in](https://www.prolific.co/)
2) Click on "New Study"
3) Under the "Study Link" section, include the URL of your web app and select "I'll use URL parameters"
4) Under the "Study Completion" section, select "I'll give them the Completion Code to copy & paste"
5) Set any other parameters to your preference and publish! Now you just need to wait for the responses to come in.

Prolific does not have a sandbox mode. However, you can still perform testing by setting the visibility of the test to just yourself.

### Amazon Mechanical Turk (MTurk)

MTurk is an Amazon platform that utilizes the power of crowd-sourcing to conduct subjective research with a more diverse population in a much more affordable manner than traditional lab testing.

To integrate the web app with MTurk, [create a new account or sign in as a requester](https://www.mturk.com/).

Once logged in, simply use the survey link template to start a new project.

To avoid mistakes, I recommend using the sandbox mode both as a requester and worker to ensure your HIT (Human Intelligence Task) is working as intended.

# Obtaining Your Results

Once you have received responses from your users, you can download your results by running the following command:
`python scripts/from_mysql.py`

The results will then be saved in a directory located in the `results` directory labeled with the date and time that you ran the python command. Within the directory, there will be a csv file for each of the tables in the database.

# Troubleshooting

When running the React web app along with the Node.js server and MySQL database, you should see tables automatically populating rows with information inputted by the user. However, if that is not the case, start with the database and try manually insert information into tables. If that works, try manually calling API endpoints to insert or view data from the tables. Lastly, you can check to see that the React webapp is successfully calling API endpoints by checking the print statements generated by the Node.js server.

### Front-End Troubleshooting
Once the app is running in your preferred web browser, use the developer tools for debugging.

### Back-End Troubleshooting
To test the API endpoints, I recommend using [postman.com](https://www.postman.com/). I recommend watching this [YouTube tutorial](https://youtu.be/SdckCRA2EFQ?t=621) to get a better idea of how you can test the api endpoints (Postman tutorial starts at 10:21).

### Database Troubleshooting
If you decided to use a SQL database, a useful tool for troubleshooting is [MySQL Workbench](https://www.mysql.com/products/workbench/)

# Contact
If you have any questions or comments, you can reach me at [btang.tsp@gmail.com](mailto:btang.tsp@gmail.com)
