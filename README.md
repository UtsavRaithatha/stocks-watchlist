# Project Name

Welcome to Stock Watchlist Web app! This project combines Django as the backend framework and React as the frontend library.

## Technologies Used

- **Backend**:
  - Django
  - Django REST Framework
- **Frontend**:
  - React
  - Material UI
  - Typescript

## Features

- User Authentication using JWT
- Search for stocks using stock symbols and add to watchlist
- Monitor the stocks added to the watchlist

## Installation

To run this project locally, follow these steps:

### Backend (Django)

1. Clone this repository to your local machine.
2. Navigate to the `backend` directory.
3. Create a virtual environment: `python -m venv env`.
4. Activate the virtual environment:
   - On Windows: `.\env\Scripts\activate`
   - On macOS/Linux: `source env/bin/activate`
5. Install dependencies: `pip install -r requirements.txt`.
6. Run migrations: `python manage.py migrate`.
7. Start the Django development server: `python manage.py runserver`.

### Frontend (React)

1. Navigate to the `frontend` directory.
2. Install dependencies: `npm install` or `yarn install`.
3. Start the React development server: `npm start` or `yarn start`.

## Usage

Once the backend and frontend servers are running, you can access the application through your web browser at `http://localhost:3000`.

## Auth Endpoints

- **POST `/api/auth/login`**: Authenticates a user and returns a JWT token.
- **POST `/api/auth/register`**: Registers a new user.

## Stock Endpoints

- **GET `/api/stocks`**: Retrieves a list of stocks.
- **GET `/api/stocks/:symbol`**: Retrieves details of a specific stock.

## Logout Endpoint

- **POST `/api/auth/logout`**: Logs out the current user.
