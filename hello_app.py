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
            'Start_Time': accident['Start_Time'],
            'End_Time': accident['End_Time'],
            'Severity': accident['Severity'],
            'Latitude': accident['Latitude'],
            'Longitude': accident['Longitude'],
            'Description': accident['Description'],
            'City': accident['City'],
            'State': accident['State'],
            'Temperature': accident['Temperature'],
            'Visibility': accident['Visibility'],
            'Weather_Condition': accident['Weather_Condition'],
            'Wind_Speed': accident['Wind_Speed']
        }
        accidents_list.append(accident_data)
    return jsonify(accidents_list)

if __name__ == '__main__':
    app.run(debug=True, port = 7000)