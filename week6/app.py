from typing import Annotated
from fastapi import FastAPI, Form, Path, Request
from fastapi.responses import HTMLResponse
from fastapi.responses import RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from starlette.middleware.sessions import SessionMiddleware
import mysql.connector

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
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(f"SELECT * FROM members WHERE username = '{username}';")
        existing_user = cursor.fetchone()
        if existing_user:
            cursor.close()
            conn.close()
            message="Repeated username."
            return RedirectResponse(f"/error?message={message}", status_code = 302)
        else:
            cursor.execute(f"INSERT INTO members(name, username, password) VALUES('{name}', '{username}', '{password}');")
            conn.commit()
            cursor.close()
            conn.close()
            return RedirectResponse("/", status_code=302)
    except Exception as e:
        message="Repeated username. err101"
        return RedirectResponse(f"/error?message={message}", status_code = 302)
    
@app.post("/signin", response_class=HTMLResponse)
async def signin(
    request: Request,
    username: Annotated[str, Form()],
    password: Annotated[str, Form()]
    ):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(f"SELECT * FROM members WHERE username = '{username}' AND password = '{password}'")
        existing_user = cursor.fetchone()
        cursor.close()
        conn.close()

        if existing_user:
            request.session['SIGNED_IN'] = True
            request.session['MEMBER_ID'] = existing_user[0]
            request.session['USERNAME'] = existing_user[2]
            request.session['NAME'] = existing_user[1]
            return RedirectResponse("/member", status_code = 302)
        else:
            message="Username or password is not correct."
            return RedirectResponse(f"/error?message={message}", status_code = 302)
    except Exception as e:
        message="Username or password is not correct. err102"
        return RedirectResponse(f"/error?message={message}", status_code = 302)

@app.get("/signout", response_class=HTMLResponse)
async def signout(request: Request):
    request.session["SIGNED_IN"] = False
    return RedirectResponse("/", status_code=302)

@app.get("/error", response_class=HTMLResponse)
async def error(request: Request, message: str = None):
    title = "登入失敗頁面"
    info_title = "失敗頁面"
    return templates.TemplateResponse(request = request, name = "info.html", 
                                      context = {"title":title ,
                                                 "info_title":info_title, 
                                                 "message": message,
                                                 "link": "/",
                                                 "link_message": "回首頁"
                                                 })

@app.get("/member", response_class=HTMLResponse)
async def member(request: Request):
    if request.session.get("SIGNED_IN") != True:
        return RedirectResponse(url="/", status_code=302)
    name = request.session['NAME']
    title = "會員頁面"
    info_title = "歡迎光臨，這是會員頁"
    message = f"{name}，歡迎登入系統"
    return templates.TemplateResponse(request = request, name = "member.html", 
                                      context = {"title":title ,
                                                 "info_title":info_title,
                                                 "message": message,
                                                 "link": "/signout",
                                                 "link_message": "登出系統"
                                                 })

@app.get("/createMessage", response_class=HTMLResponse)
async def createMessage(request: Request):
    if request.session.get("SIGNED_IN") != True:
        return RedirectResponse(url="/", status_code=302)
    username = request.session['USERNAME']


