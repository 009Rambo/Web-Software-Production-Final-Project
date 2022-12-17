


## Name
To Do App - Final Project for web software production course 

## Description

This app can add the to do lists as well as can delete them as required. You can type in the topic of the to do task in the "create a new to do thing" section and then click on the add button. It will add the to do topic to the list and similarly you can also delete the to do topic from the list by clicking on the delete button on the right side next to the to do list. 

## Getting started

To get started,
1. Run `docker-compose up -d` in the root folder.
This command starts docker containers for frontend and backend. Frontend is running at port `3001` and     backend at port `5001`.

    Frontend: `http://localhost:3001/`
    Backend: `http://localhost:5001/`



## Server address 
1. Frontend: `http://172.16.4.132:8080/`
2. Backend: `http://172.16.4.132:4040/`

## End points

GET http://localhost:5001/ HTTP/1.1
###
GET http://localhost:5001/api/v1 HTTP/1.1
###
GET http://localhost:5001/api/v1/emojis HTTP/1.1
###
GET http://localhost:5001/api/v1/todos HTTP/1.1
###
GET http://localhost:5001/api/v1/todos/1 HTTP/1.1
###
POST http://localhost:5001/api/v1/todos HTTP/1.1
content-type: application/json


###
PATCH  http://localhost:5001/api/v1/todos/4 HTTP/1.1
content-type: application/json


###
DELETE http://localhost:5001/api/v1/todos/4 HTTP/1.1
content-type: application/json



## Completed Phases
We believe that we have completed till the fourth phase.

## Expected project grade and the reasoning 
We expect our grade to be 5 since we have completed the required number of exercises + final project and also participated in the AWS week.


## Team members
Srijana Poudel & Ramesh Pandey

## License
For open source projects, available up on the request from the team members.

## Project status
completed as per the project requirements.
