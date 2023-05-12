import firebase_admin
from firebase_admin import credentials, db, firestore
import json
from datetime import datetime

from numpy import equal
from Person import Person
from faceData import *
cred_obj = credentials.Certificate('storeDB.json')
databaseURL = 'https://storelytics-app-default-rtdb.firebaseio.com/'

default_app = firebase_admin.initialize_app(cred_obj, {
    'databaseURL': databaseURL
})

time_in_name = 'time_in'
time_out_name = 'time_out'
id_name = 'id'

realtime_db = db.reference("/Customers")
db = firestore.client()
# data = {'time_in': "07/27/2022 06:53PM", "time_out": "07/27/2022 06:56PM"}
now = datetime.now()

a = str(now.month) + "/" + str("%d") + "/" + str(now.year)
b = now.strftime("%-I:%M %p")


def enter_user(count: int) -> str:
    data = {
        time_in_name: datetime.now().strftime(a + " " + b),
        time_out_name: None,
        id_name: count
    }
    data = json.dumps(data)
    new_post = realtime_db.push(data)
    return new_post.key


def leave_user(key: str, meta):
    print("key (leave_user): "+key)
    for meta_key, value in meta.items():
        print(meta_key, ' : ', value)
    people = realtime_db.order_by_key().get()
    for id, val in people.items():
        if id in key:
            user = json.loads(val)
            # realtime_db.child(id).delete()
            # user = json.loads(realtime_db.child(str(key)).get())
            print(user)
            user[time_out_name] = datetime.now().strftime(a + " " + b)
            print(datetime.now().strftime(a + " " + b))
            for key, value in meta.items():
                if key in 'dominant_race':
                    user['race'] = value
                elif key in 'dominant_emotion':
                    user['emotion'] = value
                elif key in 'gender':
                    user['gender'] = value
                else:
                    continue
            db.collection('Customers').add(user)
        else:
            continue


def get_difference(key: str):
    time_out = datetime.strptime(
        realtime_db.get()[key][time_out_name], a + " " + b)
    time_in = datetime.strptime(
        realtime_db.get()[key][time_in_name], a + " " + b)
    difference = time_out - time_in

    return difference.total_seconds() / 60


def get_user(key: str):
    return realtime_db.get()[key]


def get_data():
    customers = db.collection('customers').stream()
    data = {}
    for customer in customers:
        data[customer.id] = customer.to_dict()
    return data
