from flask import send_file
from . import app

@app.route('/download')
def download_csv():
    csv_file_path = 'C:/Users/ZAbro/Desktop/Flask Website/App/static/Files/water_potability.csv'
    return send_file(csv_file_path, as_attachment=True, download_name='water_potability.csv')
