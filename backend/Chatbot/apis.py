from ninja import NinjaAPI
from .models import Chat, User
from .views import chat_with_gemini
from .schemas import ChatSchema, UserSchema, ReplySchema, UserDataSchema, ChatHistorySchema
from typing import List

app = NinjaAPI()

prompt = '''
SYSTEM: You are StartupRoadmapGPT, an expert startup validation assistant. Your job is to generate a clear, beginner-friendly, phase-by-phase roadmap for any new startup, covering every critical milestone from ideation to launch and beyond.

USER:
Startup Idea: {{startup_idea}}
Industry / Sector: {{industry}}
Founders’ Background: {{founder_background}}
High-Level Description: {{one_liner_description}}
Target Audience: {{target_audience}}
Response Mode: {{response_mode}}

TASK:
Based on the information above and the repsonse mode (validation or risk analysis or planning), create a comprehensive startup roadmap divided into these five phases:

  1. *Discover & Define*  
     - Identify and articulate the core problem.  
     - Validate problem relevance and urgency.  
     - Define the unique value proposition.

  2. *Plan & Prototype*  
     - Conduct market research and competitor analysis.  
     - Outline features, MVP scope, and technical requirements.  
     - Develop a low-fidelity prototype or wireframe.

  3. *Build & Validate*  
     - Assemble a minimal team and tech stack.  
     - Build the MVP.  
     - Run usability tests and gather feedback.  
     - Iterate and refine the product.

  4. *Launch & Acquire*  
     - Prepare legal, financial, and registration steps (e.g., company incorporation, domain purchase).  
     - Develop go-to-market strategy and marketing channels.  
     - Plan customer acquisition and early traction tactics.

  5. *Scale & Sustain*  
     - Optimize operations and key metrics (e.g., CAC, LTV).  
     - Secure funding or partnerships.  
     - Expand product features and enter new markets.  
     - Establish support, analytics, and growth processes.

OUTPUT FORMAT:
- Use clear headings for each phase (e.g., “### Phase 1: Discover & Define”).
- Under each heading, list 4–6 actionable bullet points.
- Write in a friendly, beginner-oriented tone—assume no prior startup experience.
- Where relevant, include “Tips” or “Examples” in italics for extra guidance.
- Do not exceed 300 words total.

Now, wait for the user input, ask the user for any missing information and generate the startup roadmap.
'''

@app.get('/login',response= {200: UserSchema, 400: bool})
def login(request, email: str, password: str):
    user = User.objects.filter(email=email, password=password).first()
    if user:
        response = chat_with_gemini(prompt)
        print(response)
        return {
            "id": user.id,
            "name": user.name,
            "email": user.email
        }
    
    return 400, False

@app.post('/register',response= UserSchema)
def register(request, payload: UserDataSchema):
    user = User.objects.create(**payload.dict())
    return user

@app.post('/validate',response= ReplySchema)
def validate(request, payload: ChatSchema):
    user = User.objects.get(pk=payload.user_id)
    chat = Chat.objects.create(user=user, message=payload.message, reply="")
    # query = f"You are a seasoned startup advisor with deep expertise in early-stage idea validation. When answering a query, please follow these guidelines:\n\n1. Provide clear, step-by-step guidance on assessing the uniqueness and feasibility of the startup idea. Detail the process in distinct steps or bullet points.\n\n2. Include practical strategies for market research and competitor analysis. Name at least two specific free tools or resources that early-stage entrepreneurs can use, and explain how to use them effectively.\n\n3. Offer actionable advice with concrete examples, citing potential pitfalls and challenges to watch out for.\n\n4. Ensure your response is concise yet thorough, targeted towards entrepreneurs with limited resources who need to quickly validate their idea.\n\nBased on these instructions, please answer the following user query:\n{payload.message}"
    query = f"response_mode= validation, startup_idea = {payload.message}"
    response = chat_with_gemini(query)
    chat.reply = response
    print(response)
    chat.save()
    return chat

@app.post('/risks',response= ReplySchema)
def plan(request, payload: ChatSchema):
    user = User.objects.get(pk=payload.user_id)
    chat = Chat.objects.create(user=user, message=payload.message, reply="")
    # query = f"You are a seasoned startup advisor with extensive expertise in startup risk analysis. When answering a query related to risk analysis, please follow these guidelines:\n\n1. Provide clear, step-by-step guidance on identifying and assessing common startup risks, including market uncertainties, operational challenges, competitive threats, and financial vulnerabilities.\n\n2. Offer practical risk mitigation strategies and actionable recommendations for overcoming these risks, citing specific tools, frameworks, or methodologies for evaluating and managing potential challenges.\n\n3. Include concrete examples and discuss potential pitfalls to help entrepreneurs understand both immediate and long-term considerations for protecting and strengthening their startup.\n\nBased on these instructions, please answer the following user query. \n Here is the query: \n{payload.message}"
    query = f"response_mode= risk analysis, startup_idea = {payload.message}"
    response = chat_with_gemini(query)
    chat.reply = response
    print(response)
    chat.save()
    return chat

@app.post('/plan',response= ReplySchema)
def guide(request, payload: ChatSchema):
    user = User.objects.get(pk=payload.user_id)
    chat = Chat.objects.create(user=user, message=payload.message, reply="")
    # query = f"You are a seasoned startup advisor with extensive experience in strategic planning and long-term guidance for startups. When answering a query related to planning or long-term guidance, please follow these guidelines:\n\n1. Provide clear, step-by-step guidance on building a robust business model and an effective go-to-market strategy.\n\n2. Offer practical recommendations on resource allocation, customer acquisition, and scalability, including specific tactics, tools, or frameworks to implement these strategies.\n\n3. Provide concrete examples and detailed explanations to illustrate planning and growth strategies that are actionable and easy to understand.\n\n4. Discuss key considerations for future growth, including methods to track success metrics and adjust strategies over time to ensure long-term success.\n\nBased on these instructions, please answer the following user query:\n{payload.message}"
    query = f"response_mode= planning, startup_idea = {payload.message}"
    response = chat_with_gemini(query)
    chat.reply = response
    print(response)
    chat.save()
    return chat



@app.get('/history',response=List[ChatHistorySchema])
def history(request, user_id: int):
    user = User.objects.get(pk=user_id)
    chats = Chat.objects.filter(user=user).order_by('timestamp')
    if chats:
        return chats
    return []
