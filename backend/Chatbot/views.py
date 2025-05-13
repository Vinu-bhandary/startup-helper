from django.shortcuts import render
import google.generativeai as genai

genai.configure(api_key="AIzaSyCcfpReTAV2uYBvxdoX37q8vGkPsaZiGjQ")

model = genai.GenerativeModel("gemini-2.0-flash")
def chat_with_gemini(user_input):
    response = model.generate_content(user_input)
    return response.text

