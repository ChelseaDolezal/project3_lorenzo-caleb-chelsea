from flask import Flask, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS

app = Flask(__name__)

# Enable CORS for a specific domain
CORS(app, resources={r"/api/*": {"origins": "http://localhost:8000"}})

# Configure MongoDB connection
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
    response = jsonify(accidents_list)
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:8000')
    return response

# Choropleth variables api route
@app.route('/api/states', methods=['GET'])
def get_states():
    group_query = {"$group": {
        "_id": "$STATENAME",
        "PersonsKilled": {"$sum": "$FATALS"},
        "TotalVehicles": {"$sum": "$VE_TOTAL"},
        "CarAccidents":  {"$sum": 1}
    }}
    pipeline = [group_query]
    results = list(mongo.db.accidents.aggregate(pipeline))
    response = jsonify(results)
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:8000')
    return response

# States' populations api route
@app.route('/api/populations', methods=['GET'])
def get_populations():
    populations = [
    {
      "Population": 5074296,
      "State": "Alabama"
    },
    {
      "Population": 733583,
      "State": "Alaska"
    },
    {
      "Population": 7359197,
      "State": "Arizona"
    }, 
    {
      "Population": 3045637,
      "State": "Arkansas"
    },
    {
      "Population": 39029342,
      "State": "California"
    },
    {
      "Population": 5839926,
      "State": "Colorado"
    },
    {
      "Population": 3626205,
      "State": "Connecticut"
    },
    {
      "Population": 1018396,
      "State": "Delaware"
    },
    {
      "Population": 671803,
      "State": "District of Columbia"
    },
    {
      "Population": 22244823,
      "State": "Florida"
    },
    {
      "Population": 10912876,
      "State": "Georgia"
    },
    {
      "Population": 1440196,
      "State": "Hawaii"
    },
    {
      "Population": 1939033,
      "State": "Idaho"
    },
    {
      "Population": 12582032,
      "State": "Illinois"
    },
    {
      "Population": 6833037,
      "State": "Indiana"
    },
    {
      "Population": 3200517,
      "State": "Iowa"
    },
    {
      "Population": 2937150,
      "State": "Kansas"
    },
    {
      "Population": 4512310,
      "State": "Kentucky"
    },
    {
      "Population": 4590241,
      "State": "Louisiana"
    },
    {
      "Population": 1385340,
      "State": "Maine"
    },
    {
      "Population": 6164660,
      "State": "Maryland"
    },
    {
      "Population": 6981974,
      "State": "Massachusetts"
    },
    {
      "Population": 10034118,
      "State": "Michigan"
    },
    {
      "Population": 5717184,
      "State": "Minnesota",
    },
    {
      "Population": 2940057,
      "State": "Mississippi"
    },
    {
      "Population": 6177957,
      "State": "Missouri"
    },
    {
      "Population": 1122867,
      "State": "Montana"
    },
    {
      "Population": 1967923,
      "State": "Nebraska"
    },
    {
      "Population": 3177772,
      "State": "Nevada"
    },
    {
      "Population": 1395231,
      "State": "New Hampshire"
    },
    {
      "Population": 9261699,
      "State": "New Jersey"    
    },
    {
      "Population": 2113344,
      "State": "New Mexico"
    },
    {
      "Population": 19677151,
      "State": "New York"
    },
    {
      "Population": 10698973,
      "State": "North Carolina"
    },
    {
      "Population": 779261,
      "State": "North Dakota"
    },
    {
      "Population": 11756058,
      "State": "Ohio"
    },
    {
      "Population": 4019800,
      "State": "Oklahoma"
    },
    {
      "Population": 4240137,
      "State": "Oregon"
    },
    {
      "Population": 12972008,
      "State": "Pennsylvania"
    },
    {
      "Population": 1093734,
      "State": "Rhode Island"
    },
    {
      "Population": 5282634,
      "State": "South Carolina"
    },
    {
      "Population": 909824,
      "State": "South Dakota"
    },
    {
      "Population": 7051339,
      "State": "Tennessee"
    },
    {
      "Population": 30029572,
      "State": "Texas"
    },
    {
      "Population": 3380800,
      "State": "Utah"
    },
    {
      "Population": 647064,
      "State": "Vermont"
    },
    {
      "Population": 8683619,
      "State": "Virginia"
    },
    {
      "Population": 7785786,
      "State": "Washington"
    },
    {
      "Population": 1775156,
      "State": "West Virginia"
    },
    {
      "Population": 5892539,
      "State": "Wisconsin"
    },
    {
      "Population": 581381,
      "State": "Wyoming"
    },
    {
      "Population": 3221789,
      "State": "Puerto Rico"
    }
]
    return populations


if __name__ == '__main__':
    app.run(debug=True, port=9000)