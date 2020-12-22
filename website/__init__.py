from flask import Flask, session, redirect
from flask_sitemap import Sitemap

app = Flask(__name__)
ext = Sitemap(app=app)

from website import routes
