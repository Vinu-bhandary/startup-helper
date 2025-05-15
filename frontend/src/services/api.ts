// src/services/api.ts

// Adjust the BASE_URL if your Django server runs on a different host or uses /api prefix.
const API_BASE_URL = 'http://127.0.0.1:8000/api';

// Define types for the responses and request payloads

interface User {
  id: number;
  name: string;
  email: string;
}

interface IdeaValidationResponse {
  reply: string;
  // Add other fields as needed based on the API response
}

interface RiskAnalysisResponse {
  reply: string;
  // Add other fields as needed based on the API response
}

interface PlanGuidanceResponse {
  reply: string;
  // Add other fields as needed based on the API response
}

interface Chat {
  // Define properties of a chat based on your API response
  id: number;
  message: string;
  timestamp: string;
}

//
// 1. Login
//
export async function login(email: string, password: string): Promise<User> {
  // Using a GET request with query parameters
  const response = await fetch(`${API_BASE_URL}/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
  if (!response.ok) {
    throw new Error('Login failed');
  }
  return response.json(); // Expected to return { id, name, email }
}

//
// 2. Register
//
export async function register(userData: { name: string; email: string; password: string }): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error('Registration failed');
  }
  return response.json(); // Expected to return { id, name, email }
}

//
// 3. Validate Idea
//
export async function validateIdea(user_id: number, message: string): Promise<IdeaValidationResponse> {
  console.log(user_id, message);
  const response = await fetch(`${API_BASE_URL}/validate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user_id, message }),
  });
  if (!response.ok) {
    throw new Error('Idea validation failed');
  }
  return response.json(); // Expected to return { reply: "..." }
}

//
// 4. Analyze Risks
//
export async function analyzeRisks(user_id: number, message: string): Promise<RiskAnalysisResponse> {
  console.log(user_id, message);
  const response = await fetch(`${API_BASE_URL}/risks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user_id, message }),
  });
  if (!response.ok) {
    throw new Error('Risk analysis failed');
  }
  return response.json(); // Expected to return { reply: "..." }
}

//
// 5. Plan Guidance
//
export async function planGuidance(user_id: number, message: string): Promise<PlanGuidanceResponse> {
  console.log(user_id, message);
  const response = await fetch(`${API_BASE_URL}/plan`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user_id, message }),
  });
  if (!response.ok) {
    throw new Error('Planner guidance failed');
  }
  return response.json(); // Expected to return { reply: "..." }
}

//
// 6. Get Chat History
//
export async function getHistory(user_id: number): Promise<Chat[]> {
  const response = await fetch(`${API_BASE_URL}/history?user_id=${user_id}`);
  if (!response.ok) {
    throw new Error('Fetching chat history failed');
  }
  return response.json(); // Expected to return an array of chats
}
