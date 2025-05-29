# UDBHAVA - Startup Helper Chatbot

**UDBHAVA** is an AI-driven startup advisor designed to help early-stage entrepreneurs validate their business ideas, assess risks, and plan for long-term success. The system is powered by a Django backend (with Django Ninja for RESTful APIs), integrates the Gemini API for smart and contextual responses, and features a modern React-based frontend with PostgreSQL for persistent data storage.

---

## 🚀 Features

* **🧠 Idea Validation:**
  Step-by-step evaluation of startup ideas focusing on uniqueness, feasibility, and market fit.

* **⚠️ Risk Analysis:**
  Identification and mitigation strategies for startup risks, including market, operational, and financial threats.

* **📈 Strategic Planning:**
  Guidance on building business models, go-to-market strategies, and scalable startup roadmaps.

* **🔐 User Authentication:**
  Login and registration system to manage user-specific chat sessions.

* **💬 Interactive Chat Interface:**
  Real-time chatbot experience with three distinct modes: Validator, Risk, and Planner.

* **🧹 Clean Output Formatting:**
  Automatic cleanup of AI responses, supporting markdown (via React Markdown) for readable, well-structured replies.

---

## 🛠️ Technology Stack

### Backend

* Python, Django
* Django Ninja (REST API framework)
* Gemini API (for AI-generated responses)
* PostgreSQL (relational database)

### Frontend

* React (with TypeScript)
* React Router DOM
* Tailwind CSS for styling

### Utilities & Tools

* `django-cors-headers` for CORS support
* `fetch` API for frontend-backend communication
* `react-markdown` and `remark-gfm` for rendering formatted responses

---

## ⚙️ Installation

### 📌 Backend Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Vinu-bhandary/startup-helper.git
   cd startup-helper
   ```

2. **Create & activate a virtual environment:**

   ```bash
   python -m venv env
   source env/bin/activate   # On Windows: env\Scripts\activate
   ```

3. **Install dependencies:**

   ```bash
   pip install -r backend/requirements.txt
   ```

4. **Configure PostgreSQL:**

   Update the database settings in `backend/settings.py` to match your PostgreSQL credentials.

5. **Apply migrations:**

   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

6. **Start the backend server:**

   ```bash
   python manage.py runserver
   ```

   Backend runs at: [http://127.0.0.1:8000](http://127.0.0.1:8000)

---

### 📌 Frontend Setup

1. **Navigate to the frontend directory:**

   ```bash
   cd frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

   Frontend runs at: [http://localhost:8080](http://localhost:8080)

---

## 📡 API Endpoints

These APIs are exposed via Django Ninja:

| Method | Endpoint    | Description                            |
| ------ | ----------- | -------------------------------------- |
| GET    | `/login`    | Authenticates user by email & password |
| POST   | `/register` | Registers a new user                   |
| POST   | `/validate` | Validates startup idea using AI        |
| POST   | `/risks`    | Provides risk mitigation strategies    |
| POST   | `/plan`     | Offers long-term planning suggestions  |
| GET    | `/history`  | Returns user's chat history            |

> 🔖 Make sure API URLs in the frontend match the backend route (add `/api/` prefix if configured in Django).

---

## 🧑‍💼 Usage Guide

* **Login/Register:**
  Start by creating an account or logging in to an existing one. Session data is stored in localStorage.

* **Choose a Mode:**

  * **Validator Mode** → Validate startup ideas.
  * **Risk Mode** → Assess business risks.
  * **Planner Mode** → Get long-term strategy suggestions.

* **Chat Interaction:**
  Enter your idea or question in the chat box. Responses will be formatted in a readable markdown format for clarity and better UX.

---

## 📎 Notes

* Use `.env` files or environment variables to securely store any secret keys or Gemini API credentials.
* Responses are designed to be adaptive, based on the selected chat mode and user context.
* Chat history is fetched and displayed dynamically on page load.

---
