from typing import Annotated
from fastapi import FastAPI, Form, Path, Request
from fastapi.responses import HTMLResponse
from fastapi.responses import RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from starlette.middleware import Middleware
from starlette.middleware.sessions import SessionMiddleware

app = FastAPI()

app.add_middleware(SessionMiddleware, secret_key="vb64tgtr45")

templates = Jinja2Templates(directory="templates")

app.mount("/static", StaticFiles(directory="static"), name="static")

dummy_username = "test"
dummy_password = "test"

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    info_title = "歡迎光臨，請輸入帳號密碼"
    return templates.TemplateResponse(request = request, name = "index.html", context = {"info_title":info_title})

@app.post("/signin", response_class=HTMLResponse)
async def signin(
    request: Request,
    username: Annotated[str, Form()], 
    password: Annotated[str, Form()]
    ):
    if not username or not password:
        message="請輸入使用者名稱和密碼"
        return RedirectResponse(f"/error?message={message}", status_code = 302)
    elif username == dummy_username and password == dummy_password:
        request.session['SIGNED_IN'] = True
        return RedirectResponse("/member", status_code = 302)
    else:
        message="帳號或密碼輸入錯誤"
        return RedirectResponse(f"/error?message={message}", status_code = 302)

# @app.post("/signout", response_class=HTMLResponse)
# async def signout():
#     #
#     return RedirectResponse("/")

@app.get("/error", response_class=HTMLResponse)
async def error(request: Request, message: str = None):
    title = "登入失敗頁面"
    info_title = "失敗頁面"
    return templates.TemplateResponse(request = request, name = "info.html", context = {"title":title ,"info_title":info_title, "message": message})

@app.get("/member", response_class=HTMLResponse)
async def member(request: Request):
    title = "會員頁面"
    info_title = "歡迎光臨，這是會員頁"
    message = "恭喜您，成功登入系統"
    return templates.TemplateResponse(request = request, name = "info.html", context = {"title":title ,"info_title":info_title, "message": message})

@app.get("/square/{num}", response_class=HTMLResponse)
async def square(request: Request, num: Annotated[int, Path(gt=0)]):
    title = "計算結果頁面"
    info_title = "正整數平方計算結果"
    message = num ** 2
    return templates.TemplateResponse(request = request, name = "info.html", context = {"title":title ,"info_title":info_title, "message": message})


