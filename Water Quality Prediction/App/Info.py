from flask import render_template
from . import app

@app.route("/info", methods=["POST", "GET"])
def info():
    return render_template("info.html")