# UDBHAVA - Startup Helper Chatbot

UDBHAVA is an AI-driven startup advisor designed to help early-stage entrepreneurs validate their business ideas, assess risks, and plan for long-term success. The system leverages a Django backend with Django Ninja to expose RESTful API endpoints, integrates with the Gemini API for generating actionable responses, and provides a React-based frontend with PostgreSQL for data storage.


## Features

- **Idea Validation:**  
  Provides step-by-step guidance to validate startup ideas with a focus on market research, feasibility, and competitor analysis.
- **Risk Analysis:**  
  Offers actionable advice on identifying and mitigating startup risks, including market uncertainties and operational challenges.
- **Strategic Planning:**  
  Supplies guidance on building robust business models, go-to-market strategies, and long-term planning for scaling startups.
- **User Authentication:**  
  Simple login and registration functionality to manage user sessions.
- **Chat Interface:**  
  Interactive chatbot experiences across different modes (validator, risk, and planner).
- **Readable Output:**  
  Automatically formats AI responses for clarity, removing unwanted characters (e.g., asterisks).

## Technology Stack

- **Backend:**  
  - Python, Django, Django Ninja  
  - Gemini API for AI-powered responses  
  - PostgreSQL as the database
- **Frontend:**  
  - React, React Router  
  - CSS for styling
- **Other Tools:**  
  - django-cors-headers for cross-origin requests  
  - Fetch API for making API calls from React

## Installation

### Backend Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Vinu-bhandary/startup-helper.git
   cd startup-helper
   ```

2. **Create and Activate a Virtual Environment:**

   ```bash
   python -m venv env
   source env/bin/activate  # On Windows: env\Scripts\activate
   ```

3. **Install Backend Dependencies:**

   ```bash
   pip install -r backend/requirements.txt
   ```

4. **Configure the Database:**  
   Update your Django `settings.py` with your PostgreSQL configuration.

5. **Apply Migrations:**

   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

6. **Run the Django Server:**

   ```bash
   python manage.py runserver
   ```

   The backend should now be running at `http://127.0.0.1:8000`.

### Frontend Setup

1. **Navigate to the Frontend Directory:**

   ```bash
   cd frontend
   ```

2. **Install Frontend Dependencies:**

   ```bash
   npm install
   ```

3. **Run the React Development Server:**

   ```bash
   npm start
   ```

   The frontend should now be accessible at `http://localhost:3000`.

## API Endpoints

The backend exposes several endpoints using Django Ninja:

- **GET `/login`:**  
  Authenticates a user using email and password.
- **POST `/register`:**  
  Registers a new user.
- **POST `/validate`:**  
  Validates a startup idea by generating a detailed response using the Gemini API.
- **POST `/risks`:**  
  Provides actionable advice on startup risk analysis.
- **POST `/plan`:**  
  Offers strategic planning guidance.
- **GET `/history`:**  
  Retrieves the chat history for a specific user.

> **Note:** If you are using a URL prefix (e.g., `/api/`), ensure your frontend API calls are updated accordingly.

## Usage

- **User Authentication:**  
  Use the login and registration pages to manage user sessions. User details are stored in localStorage.
- **Chat Modes:**  
  - **Validator Mode:** Validate your startup ideas.
  - **Risk Mode:** Analyze and mitigate potential risks.
  - **Planner Mode:** Get strategic guidance for long-term success.
- **Response Formatting:**  
  AI responses are automatically formatted (e.g., split into paragraphs and cleaned of unwanted characters) before being displayed.
