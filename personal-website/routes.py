from flask import render_template
from personal-website import app

posts = [
    {
        "author": "Gonçalo Raposo",
        "title": "Primeiro Post",
        "content": "Isto de fazer sites até é engraçado!",
        "date_posted": "23 de outubro de 2020"
    },
    {
        "author": "John Doe",
        "title": "Segundo Post",
        "content": "Beep boop",
        "date_posted": "24 de outubro de 2020"
    }
]

@app.route('/')
@app.route("/home")
def home():
    return render_template("home.html", posts=posts)

@app.route("/about")
def about():
    return render_template("about.html", title="Sobre")
