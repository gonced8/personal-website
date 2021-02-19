import os
from flask import render_template, send_from_directory
from website import app, ext


@app.route("/")
@app.route("/home")
def home():
    return render_template("landing_page.html")


@app.route("/favicon.ico")
def favicon():
    return send_from_directory(
        os.path.join(app.root_path, "static"), "favicon.ico", mimetype="icon"
    )


@ext.register_generator
def index():
    yield "home", {}


@ext.register_generator
def index():
    yield "favicon", {}
