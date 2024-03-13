# Water Quality Predictor Web Application

This is a web application built with Flask to predict the potability of water based on certain input parameters. The application provides a user-friendly interface for users to input water quality parameters, and it predicts whether the water is safe and potable or not.

# Features
    Home Page: Navigate to the home page to access the main functionality of the application.
    Prediction: Input water quality parameters and receive a prediction on whether the water is safe or not.
    Dashboard: View a dashboard with additional information (dummy endpoint).
    Download CSV: Download a CSV file containing water potability data.
    Information Page: Access an information page providing additional details.

## Setup & Installation

Make sure you have the latest version of Python installed.

```bash
git clone <repo-url>
```

```bash
pip install -r requirements.txt
```

## Running The App

```bash
python app.py
```
Go to 'http://127.0.0.1:5000'

# Endpoints

    Home: http://localhost:5000/
    Prediction: http://localhost:5000/predict
    Dashboard: http://localhost:5000/dash
    Download CSV: http://localhost:5000/download
    Information Page: http://localhost:5000/info

# Download CSV

Click on the "Download CSV" endpoint to download a CSV file containing water potability data.
# Information
Visit the "FAQs Page" to access additional information and details about the application.
