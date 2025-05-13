from ninja import NinjaAPI
from .models import Chat, User
from .views import chat_with_gemini
from .schemas import ChatSchema, UserSchema, ReplySchema, UserDataSchema, ChatHistorySchema
from typing import List

app = NinjaAPI()


@app.get('/login',response= {200: UserSchema, 400: bool})
def login(request, email: str, password: str):
    user = User.objects.filter(email=email, password=password).first()
    if user:
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
    query = f"You are a seasoned startup advisor with deep expertise in early-stage idea validation. When answering a query, please follow these guidelines:\n\n1. Provide clear, step-by-step guidance on assessing the uniqueness and feasibility of the startup idea. Detail the process in distinct steps or bullet points.\n\n2. Include practical strategies for market research and competitor analysis. Name at least two specific free tools or resources that early-stage entrepreneurs can use, and explain how to use them effectively.\n\n3. Offer actionable advice with concrete examples, citing potential pitfalls and challenges to watch out for.\n\n4. Ensure your response is concise yet thorough, targeted towards entrepreneurs with limited resources who need to quickly validate their idea.\n\nBased on these instructions, please answer the following user query:\n{payload.message}"
    response = chat_with_gemini(query)
    chat.reply = response
    chat.save()
    return chat

@app.post('/risks',response= ReplySchema)
def plan(request, payload: ChatSchema):
    user = User.objects.get(pk=payload.user_id)
    chat = Chat.objects.create(user=user, message=payload.message, reply="")
    query = f"You are a seasoned startup advisor with extensive expertise in startup risk analysis. When answering a query related to risk analysis, please follow these guidelines:\n\n1. Provide clear, step-by-step guidance on identifying and assessing common startup risks, including market uncertainties, operational challenges, competitive threats, and financial vulnerabilities.\n\n2. Offer practical risk mitigation strategies and actionable recommendations for overcoming these risks, citing specific tools, frameworks, or methodologies for evaluating and managing potential challenges.\n\n3. Include concrete examples and discuss potential pitfalls to help entrepreneurs understand both immediate and long-term considerations for protecting and strengthening their startup.\n\nBased on these instructions, please answer the following user query. \n Here is the query: \n{payload.message}"
    response = chat_with_gemini(query)
    chat.reply = response
    chat.save()
    return chat

@app.post('/plan',response= ReplySchema)
def guide(request, payload: ChatSchema):
    user = User.objects.get(pk=payload.user_id)
    chat = Chat.objects.create(user=user, message=payload.message, reply="")
    query = f"You are a seasoned startup advisor with extensive experience in strategic planning and long-term guidance for startups. When answering a query related to planning or long-term guidance, please follow these guidelines:\n\n1. Provide clear, step-by-step guidance on building a robust business model and an effective go-to-market strategy.\n\n2. Offer practical recommendations on resource allocation, customer acquisition, and scalability, including specific tactics, tools, or frameworks to implement these strategies.\n\n3. Provide concrete examples and detailed explanations to illustrate planning and growth strategies that are actionable and easy to understand.\n\n4. Discuss key considerations for future growth, including methods to track success metrics and adjust strategies over time to ensure long-term success.\n\nBased on these instructions, please answer the following user query:\n{payload.message}"
    response = chat_with_gemini(query)
    chat.reply = response
    chat.save()
    return chat



@app.get('/history',response=List[ChatHistorySchema])
def history(request, user_id: int):
    user = User.objects.get(pk=user_id)
    chats = Chat.objects.filter(user=user).order_by('timestamp')
    if chats:
        return chats
    return []
