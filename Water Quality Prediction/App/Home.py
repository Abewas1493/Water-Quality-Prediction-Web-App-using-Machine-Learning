from flask import render_template
from . import app

@app.route("/",methods =["POST","GET"])
def home():
    return render_template("index.html") 