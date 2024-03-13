from flask import Flask
app = Flask(__name__)
app.secret_key ='tfdvcgsdbvdbvbcvbsvbdsvsv'
from .import Home, Dashboard, Predict, Info, Download   