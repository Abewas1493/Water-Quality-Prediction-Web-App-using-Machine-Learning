from flask import render_template
from . import app


@app.route('/dash', methods=["POST", "GET"])
def Dashboard():
    return render_template('Dashboard.html')

if __name__ == '__main__':
    app.run(debug=True)