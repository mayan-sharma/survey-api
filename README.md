# Survey API
A small api to create, view and take surveys.

## Setup locally
- Clone the repo using `https://github.com/mayan-sharma/survey-api.git`
- cd `survey-api`
- run `npm install`
- run `npm run start`

## API Reference

### `/api/login`
    - Allowed Method `POST`
    - A mock authentication endpoint
    - Returns a signed JWT token

### Example Request
    `curl --location --request POST 'http://localhost:3000/api/login' \
    --header 'Authorization: <JWT Token>' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "username": "john",
        "password": "john@123"
    }'` 

### `/api/survey/:id`
    - Allowed Methods `GET` `POST`
    - `GET` method returns the survey with its responses
    - `POST` method submits a response to a survey

### Example Request
    - `GET`
        `curl --location --request GET 'http://localhost:3000/api/survey/1' \
        --header 'Authorization: <JWT Token>`

    - `POST`
        `curl --location --request POST 'http://localhost:3000/api/survey/1' \
        --header 'Authorization: <JWT Token>' \
        --header 'Content-Type: application/json' \
        --data-raw '[
            {
                "questionId": 1,
                "response": false
            },
            {
                "questionId": 2,
                "response": true
            }
        ]'`
        

### `/api/survey`
    - Allowed Method `POST`
    - creates a survey

### Example Request
    `curl --location --request POST 'http://localhost:3000/api/survey' \
    --header 'Authorization: <JWT Token>' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "name": "TestSurvey",
        "questions": ["Question1", "Question2"]
    }'`

### `/api/image?url=''`
    - Allowed Method `GET`
    - returns a resized image

### Example Request
    `curl --location --request GET 'http://localhost:3000/api/image?url=https://i.imgur.com/kymnoiH.jpeg' \`