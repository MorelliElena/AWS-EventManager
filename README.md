# AWS-EventManager

The application purpose is to provide a management service for events, festivals and shows in the area Emilia-Romagna.

Deploy
-------------
To install the application you must already have Npm and MongoDB installed.

Once you have downloaded the project you need to perform the following steps:


1. Open a console in the project folder and type ` npm  install  `


2. Import all collections within the _./mongodb_ folder on MongoDB through the command:
   
    `mongoimport --db EventsDB --collection fileName fileName.json --jsonArray`


3. Navigate within the _./server_ folder. Run the command ` node index.js` to start  the server


4. Open another console within the project's _./client_ folder, and type ` npm install `


5. In the same console launch the application with the command ` npm start` and open your browser at <http://localhost:3000/>.


The project is configured with three accounts: the details are in the report, which is inside the folder _./doc_ .