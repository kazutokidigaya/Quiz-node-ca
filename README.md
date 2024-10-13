# Quiz Application API

## Features

- **Create Quiz**: Admin can create a new quiz with multiple-choice and true/false questions.
- **Take Quiz**: Users can take quizzes, answer questions, and get a score.
- **View Quiz Results**: After completing a quiz, users can view all the quizzes they have taken and their respective scores.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or above): [Download Node.js](https://nodejs.org/en/download/)
- **MongoDB** (Local or MongoDB Atlas): [Install MongoDB](https://www.mongodb.com/try/download/community)
- **Postman** (for API testing): [Download Postman](https://www.postman.com/downloads/)

## Setup and Installation

### 1. Clone the repository

```bash
git clone https://github.com/kazutokidigaya/Quiz-node-ca.git
cd Quiz-node-ca
```

### 2. Install dependencies

Run the following command to install all the required dependencies:

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root of the project and add the following environment variables:

```
PORT=5000
MONGODB_URI=YOUR_MONGODB_URI
JWT_SECRET_KEY=JWT_SECRET_KEY
REFRESH_TOKEN_SECRET=REFRESH_TOKEN_SECRET
NODE_ENV=production
```

### 4. Start the development server

Run the following command to start the application:

```bash
npm run dev
```

The server will start running on `http://localhost:5000`.

### 5. Testing the API with Postman

You can test the API using Postman. Here are the available endpoints:

#### 1. **Create a Quiz** (Admin only)

- **Method**: `POST`
- **URL**: `http://localhost:5000/quiz/create`
- **Headers**:
  - `Authorization`: Bearer `<JWT-TOKEN>` (Admin token)
- **Body** (Example JSON):
  ```json
  {
    "title": "General Knowledge Quiz",
    "questions": [
      {
        "questionText": "What is the capital of France?",
        "questionType": "multipleChoice",
        "options": [
          { "text": "Paris", "isCorrect": true },
          { "text": "London", "isCorrect": false }
        ],
        "correctAnswer": "Paris"
      }
    ]
  }
  ```

#### 2. **Get All Quizzes**

- **Method**: `GET`
- **URL**: `http://localhost:5000/quiz/`
- **Headers**: None

#### 3. **Get a Quiz by ID**

- **Method**: `GET`
- **URL**: `http://localhost:5000/quiz/:quizId`
- **Headers**: None

#### 4. **Submit Quiz**

- **Method**: `POST`
- **URL**: `http://localhost:5000/quiz/submit`
- **Headers**:
  - `Authorization`: Bearer `<JWT-TOKEN>` (User token)
- **Body** (Example JSON):
  ```json
  {
    "quizId": "quizId_here",
    "answers": [
      { "questionId": "questionId_1", "selectedOption": "Paris" },
      { "questionId": "questionId_2", "selectedOption": "false" }
    ]
  }
  ```

#### 5. **View User Quiz Results**

- **Method**: `GET`
- **URL**: `http://localhost:5000/quiz/view`
- **Headers**:
  - `Authorization`: Bearer `<JWT-TOKEN>` (User token)
