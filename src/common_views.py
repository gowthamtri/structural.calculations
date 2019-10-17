from datetime import datetime

from flask import Flask, render_template

from . import app

calculation_apps = [
    { "name": "Area Calculator", "route": "/area/" }
]

@app.route("/")
def home():
    return render_template("home.html", apps=calculation_apps)

