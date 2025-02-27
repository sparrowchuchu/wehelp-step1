import re
import bcrypt
import mysql.connector
from typing import Annotated
from fastapi import FastAPI, Form, Path, Request
from fastapi.responses import JSONResponse
from fastapi.responses import HTMLResponse
from fastapi.responses import RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from starlette.middleware.sessions import SessionMiddleware

app = FastAPI()

app.add_middleware(SessionMiddleware, secret_key="vb64tgtr45")

templates = Jinja2Templates(directory="templates")

app.mount("/static", StaticFiles(directory="static"), name="static")


def get_db_connection():
    return mysql.connector.connect(
        host = "localhost",
        user = "root",
        password = "test123",
        database = "website"
    )

def validate_name(name: str) -> bool:
    name_regex = r'^[\u4e00-\u9fa5a-zA-Z0-9_]{3,15}$'
    return bool(re.match(name_regex, name))

def validate_username(username: str) -> bool:
    username_regex = r'^[a-zA-Z0-9_]{3,15}$'
    return bool(re.match(username_regex, username))

def validate_password(password: str) -> bool:
    password_regex = r'^[a-zA-Z0-9_]{6,50}$'
    return bool(re.match(password_regex, password))

def validate_message(content: str) -> bool:
    message_regex = r'^[\u4e00-\u9fa5A-Za-z0-9\s\.,!?-]{3,200}$'
    return bool(re.match(message_regex, content))


@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    info_title = "歡迎光臨，請註冊登入系統"
    return templates.TemplateResponse(request = request, name = "index.html", context = {"info_title":info_title})

@app.post("/signup", response_class=HTMLResponse)
async def signup(
    request: Request,
    name: Annotated[str, Form()], 
    username: Annotated[str, Form()], 
    password: Annotated[str, Form()]
    ):
    if not(validate_name(name) and validate_username(username) and validate_password(password)):
        message = f"An unexpected error occurred: 105"
        return RedirectResponse(f"/error?message={message}", status_code=303)
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM members WHERE username = %s;", (username,))
        existing_user = cursor.fetchone()
        if existing_user:
            cursor.close()
            conn.close()
            message = "Repeated Username."
            return RedirectResponse(f"/error?message={message}", status_code = 303)

        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

        cursor.execute(
            "INSERT INTO members(name, username, password) VALUES(%s, %s, %s);", 
            (name, username, hashed_password.decode('utf-8'))
        )   
        conn.commit()
        cursor.close()
        conn.close()
        return RedirectResponse("/", status_code=303)
    except Exception as e:
        conn.close()
        # print(str(e))
        message = f"An unexpected error occurred: 101"
        return RedirectResponse(f"/error?message={message}", status_code=303)

@app.post("/signin", response_class=HTMLResponse)
async def signin(
    request: Request,
    username: Annotated[str, Form()],
    password: Annotated[str, Form()]
    ):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM members WHERE username = %s;", (username,))
        existing_user = cursor.fetchone()
        cursor.close()
        conn.close()
        if existing_user:
            stored_hash = existing_user[3]
            if bcrypt.checkpw(password.encode('utf-8'), stored_hash.encode('utf-8')):
                request.session['SIGNED_IN'] = True
                request.session['MEMBER_ID'] = existing_user[0]
                request.session['USERNAME'] = existing_user[2]
                request.session['NAME'] = existing_user[1]
                return RedirectResponse("/member", status_code = 302)
            else:
                message = "Incorrect Username or Password."
                return RedirectResponse(f"/error?message={message}", status_code = 303)
    except Exception as e:
        conn.close()
        # print(str(e))
        message = f"Incorrect Username or Password. 102"
        return RedirectResponse(f"/error?message={message}", status_code = 303)

@app.get("/signout", response_class=HTMLResponse)
async def signout(request: Request):
    request.session.clear()
    return RedirectResponse("/")

@app.get("/error", response_class=HTMLResponse)
async def error(request: Request, message: str = None):
    title = "登入失敗頁面"
    info_title = "失敗頁面"
    return templates.TemplateResponse(request = request, name = "info.html", 
                                      context = {"title": title ,
                                                 "info_title": info_title, 
                                                 "message": message,
                                                 "link": "/",
                                                 "link_message": "回首頁"
                                                 })

@app.get("/member", response_class=HTMLResponse)
async def member(request: Request, hintInfo: str = ""):
    if request.session.get("SIGNED_IN") != True:
        return RedirectResponse(url="/")
    name = request.session['NAME']
    title = "會員頁面"
    info_title = "歡迎光臨，這是會員頁"
    message = f"{name}，歡迎登入系統"
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('''SELECT mes.id, mes.member_id, mes.content, mem.name
            FROM messages mes
            JOIN members mem
            ON mes.member_id = mem.id
            ORDER BY mes.time DESC;'''
            )
        contents = cursor.fetchall()
        cursor.close()
        conn.close()
    except Exception as e:
        conn.close()
        # print(str(e))
        message="An error occurred while reading the message. err103"
        return RedirectResponse(f"/error?message={message}", status_code = 302)
    return templates.TemplateResponse(request = request, name = "member.html", 
                                      context = {"title": title ,
                                                 "info_title":info_title,
                                                 "message": message,
                                                 "link": "/signout",
                                                 "link_message": "登出系統",
                                                 "hintInfo": hintInfo,
                                                 "name": name,
                                                 "contents": contents
                                                 })

@app.get("/api/member")
async def query_member(request: Request, username: str):
    if request.session.get("SIGNED_IN") != True:
        return RedirectResponse(url="/")
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT id, name, username FROM members WHERE username = %s;", (username,))
        existing_user = cursor.fetchone()
        cursor.close()
        conn.close()
        if existing_user:
            response_data = {
                "data":{
                    "id": existing_user[0],
                    "name": existing_user[1],
                    "username": existing_user[2]
                }
            }
        else:
            response_data = {"data": None}
        return JSONResponse(content = response_data)
    except Exception as e:
        conn.close()
        # print(str(e))
        return JSONResponse(content = {"data": None})

@app.patch("/api/member")
async def update_name(request: Request, name: dict):
    if request.session.get("SIGNED_IN") != True:
        return RedirectResponse(url="/")
    member_id = request.session['MEMBER_ID']
    new_name = name.get("name")
    if not validate_name(new_name):
        return JSONResponse(content={"error": True})
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("UPDATE members SET name = %s WHERE id = %s;", (new_name, member_id))
        conn.commit()
        cursor.close()
        conn.close()
        return JSONResponse(content={"ok": True})
    except Exception as e:
        conn.close()
        # print(str(e))
        return JSONResponse(content={"error": True})

@app.post("/createMessage", response_class=HTMLResponse)
async def createMessage(
    request: Request,
    createMessage: Annotated[str, Form()],
    ):
    if request.session.get("SIGNED_IN") != True:
        return RedirectResponse(url="/", status_code=303)
    if not validate_message(createMessage):
        hintInfo = "留言至少要輸入 3 個文字"
        return RedirectResponse(f"/member?hintInfo={hintInfo}", status_code=303)
    
    member_id = request.session['MEMBER_ID']
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO messages(member_id, content) VALUES(%s, %s);", (member_id, createMessage))
        conn.commit()
        cursor.close()
        conn.close()
        return RedirectResponse("/member", status_code=303)
    except Exception as e:
        conn.close()
        # print(str(e))
        message = f"Create Message Error. 103"
        return RedirectResponse(f"/error?message={message}", status_code = 303)
    
@app.post("/deleteMessage", response_class=HTMLResponse)
async def deleteMessage(
    request: Request,
    messageId: Annotated[str, Form()],
    ):
    if request.session.get("SIGNED_IN") != True:
        return RedirectResponse(url="/", status_code=302)
    
    member_id = request.session['MEMBER_ID']
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM messages WHERE id = %s AND member_id = %s;", (messageId, member_id))
        conn.commit()
        cursor.close()
        conn.close()
        return RedirectResponse("/member", status_code=303)
    except Exception as e:
        conn.close()
        # print(str(e))
        message = f"Delete Message Error. 104"
        return RedirectResponse(f"/error?message={message}", status_code = 303)


