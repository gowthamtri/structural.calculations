from datetime import datetime

from flask import Flask, render_template

from . import app

@app.route("/")
def home():
    return render_template("home.html")

@app.route("/greet/")
@app.route("/greet/<name>")
def greet(name = None):
    return render_template(
        "greet.html",
        name=name,
        date=datetime.now()
    )

@app.route("/api/data")
def get_data():
    return app.send_static_file("data.json")
