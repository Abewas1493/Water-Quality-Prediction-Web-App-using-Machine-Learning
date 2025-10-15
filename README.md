
# 💧 Water Quality Predictor — Flask Web Application

This is a **Flask-based machine learning web app** that predicts whether water is **potable (safe to drink)** or **not**, based on various water quality parameters. It provides a simple local interface for entering data and viewing predictions.

---

## 🚀 Features

- **🏠 Home Page:** Access the main interface of the application.  
- **🔮 Prediction:** Input parameters like pH, hardness, solids, etc., to check water potability.  
- **📊 Dashboard (Demo):** Displays a sample data visualization page.  
- **⬇️ CSV Download:** Allows you to download a local CSV dataset for testing.  
- **ℹ️ Information Page:** Provides details about the app and water quality insights.  

---

## ⚙️ Setup & Installation

Ensure **Python 3.8+** is installed on your machine.

```bash
# Clone the repository
git clone <repo-url>

# Navigate into the project directory
cd water-quality-predictor

# Install dependencies
pip install -r requirements.txt
```

---

## ▶️ Run the Application Locally

```bash
python app.py
```

Then open your browser and visit:

👉 **http://127.0.0.1:5000**

---

## 🔗 Local Endpoints

| Local Path | Purpose |
|-------------|----------|
| `/` | Home page |
| `/predict` | Enter parameters and get prediction |
| `/dash` | Demo dashboard page |
| `/download` | Download the CSV dataset |
| `/info` | Learn more about the app |

---

## 📁 CSV Download

Use the `/download` endpoint while running the app locally to download a CSV file containing sample water potability data.

---

## ❓ Additional Information

The **Information Page** (`/info`) provides insights into:  
- The meaning of each water quality parameter  
- How predictions are generated  
- Tips for improving water safety  

---

## 🧠 Technologies Used

- **Python (Flask Framework)** — for backend web development  
- **Scikit-learn** — for model training and prediction  
- **HTML / CSS / Bootstrap** — for front-end styling  
- **Pandas / NumPy** — for data preprocessing  
- **Matplotlib / Seaborn** — for data visualization  

---


