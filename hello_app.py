from flask import Flask,  jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS

app =Flask(__name__)
CORS(app) 

app.config["MONGO_URI"] = "mongodb://localhost:27017/traffic_accidents"
mongo = PyMongo(app)

@app.route('/')
def hello():
    return "hello"

@app.route('/api/accidents', methods=['GET'])
def get_accidents():
    accidents = mongo.db.accidents.find()
    accidents_list = []
    for accident in accidents:
        accident_data = {
            'State': accident.get('STATE'),
            'StateName': accident.get('STATENAME'),
            'CaseID': accident.get('ST_CASE'),
            'Pedestrians': accident.get('PEDS'),
            'PersonsNotInMotorVehicle': accident.get('PERNOTMVIT'),
            'TotalVehicles': accident.get('VE_TOTAL'),
            'VehicleForms': accident.get('VE_FORMS'),
            'PersonsInvolved': accident.get('PERSONS'),
            'PersonsKilled': accident.get('PERMVIT'),
            'City': accident.get('CITY'),
            'CityName': accident.get('CITYNAME'),
            'Month': accident.get('MONTH'),
            'MonthName': accident.get('MONTHNAME'),
            'Day': accident.get('DAY'),
            'DayName': accident.get('DAYNAME'),
            'DayOfWeek': accident.get('DAY_WEEK'),
            'DayOfWeekName': accident.get('DAY_WEEKNAME'),
            'Year': accident.get('YEAR'),
            'Hour': accident.get('HOUR'),
            'HourName': accident.get('HOURNAME'),
            'Minute': accident.get('MINUTE'),
            'MinuteName': accident.get('MINUTENAME'),
            'Latitude': accident.get('LATITUDE'),
            'Longitude': accident.get('LONGITUD'),
            'HarmfulEvent': accident.get('HARM_EV'),
            'HarmfulEventName': accident.get('HARM_EVNAME'),
            'Weather': accident.get('WEATHER'),
            'WeatherName': accident.get('WEATHERNAME'),
            'Fatalities': accident.get('FATALS')
        }
        accidents_list.append(accident_data)
    return jsonify(accidents_list)

if __name__ == '__main__':
    app.run(debug=True, port = 7000)