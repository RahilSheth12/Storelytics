import firebase_admin
from firebase_admin import credentials, db, firestore
import json

cred_obj = credentials.Certificate('storeDB.json')
databaseURL = 'https://storelytics-app-default-rtdb.firebaseio.com/'

default_app = firebase_admin.initialize_app(cred_obj, {
    'databaseURL': databaseURL
})

realtime_db = db.reference("/Customers")
db = firestore.client()
users = db.collection('Customers').get()
for user in users:
    print(u'{} => {}'.format(user.id, user.to_dict()))
    db.collection('Customers').document(user.id).delete()

people = realtime_db.order_by_key().get()
for key, val in people.items():
    print('{0} was {1} meters tall'.format(key, val))
    realtime_db.child(key).delete()
