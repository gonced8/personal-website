from flask import Flask

app = Flask(__name__)

from personal_website import routes
