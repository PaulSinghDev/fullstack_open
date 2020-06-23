# A Simple Phone Book App

This app is just a simple phone book and has been made as part of the Fullstack Open course by The University of Helsinki. It is made using React on the front end and Express on the back end.

The back end serves a RESTful API from the following address: [https://cryptic-savannah-18025.herokuapp.com/api/](https://cryptic-savannah-18025.herokuapp.com/api/)

The front end is visible from: [https://cryptic-savannah-18025.herokuapp.com](https://cryptic-savannah-18025.herokuapp.com)

## API Details

### Get All People

Method: `GET`
URL: `/api/persons/`
Payload: An array of JSON objects containing the details of every entry in the phone book

### Get One Person

Method: `GET`
URL: `/api/persons/[id]`
Payload: A JSON object containing information about the person with a matching ID or a 404 status error
