from flask import render_template, request, flash
from . import app
import joblib 
import numpy as np

@app.route("/predict", methods=['GET', 'POST'])
def predict():
    if request.method == 'POST':
        model = joblib.load("App/static/Files/WaterQualityPredictor")
        ph = request.form['ph']
        Hardness = request.form['Hardness']
        Solids = request.form['Solids']
        Chloramines = request.form['Chloramines']
        Sulfate = request.form['Sulfate']
        Conductivity = request.form['Conductivity']
        Organic_carbon = request.form['Organic_carbon']
        Trihalomethanes = request.form['Trihalomethanes']
        Turbidity = request.form['Turbidity']
        feature_values = np.array([[ph, Hardness, Solids,
                                    Chloramines, Sulfate, Conductivity, Organic_carbon,
                                    Trihalomethanes, Turbidity]])

        output = model.predict(feature_values)[0]
    
        if output == 0:
            flash('⚠️ Becareful! The Water is not safe and not potable!', 'error')
        elif output == 1:
            flash('🎉 Congrats! The Water is safe and potable!', 'success')

    return render_template("predict.html", form_data=request.form)
