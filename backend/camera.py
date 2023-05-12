import face_recognition as fr
import cv2 as cv
import threading
import redis
import json
from Person import Person
import db as db
from linq import Query
from deepface import DeepFace
import numpy as np

# global variables for encoding, Redis
global host
global port
global db_num
global key
global redis_db
global people
global timeout
global count_key
count_key = "count"
# 192.168.86.26
host = "127.0.0.1"
port = 6379
db_num = 0
key = "encodings"
lock_key = "back_encodings_lock"
redis_db = redis.Redis(host=host, port=port, db=db_num, decode_responses=True)
people = []
timeout = 1


def save_encodings(lock):
    # save and load encodings
    lock.acquire()
    redis_db.set(key, json.dumps(Query(people).select(
        lambda p: {'encoding': p.encoding, 'key': p.key}).to_list()))
    # lock.release()


def add_encoding(encoding):
    global people
    with redis_db.lock(lock_key, timeout=timeout) as lock:
        increment_count()
        count = get_count()

        key = db.enter_user(count)
        person = Person(key, encoding)

        people = load_encodings()
        people.append(person)
        save_encodings(lock)


def delete_encoding_at(i, meta):
    global people
    with redis_db.lock(lock_key, timeout=timeout) as lock:
        people = load_encodings()
        person = people[i]
        people.remove(person)

        db.leave_user(person.key, meta)

        save_encodings(lock)


def load_encodings():
    redis_data = redis_db.get(key)
    if not redis_data:
        return people
    list = json.loads(redis_data)
    return Query(list).select(lambda d: Person(d['key'], d['encoding'])).to_list()


def get_count() -> int:
    count = redis_db.get(count_key)
    return int(count) if count else 0


def increment_count():
    count = get_count()
    redis_db.set(count_key, count + 1)


def compare_faces(people: list[Person], new_encoding):
    encodings = Query(people).select(lambda p: p.encoding).to_list()
    return fr.compare_faces(encodings, new_encoding)  # compare found faces


def thread_callback(frame, front: bool):
    frame = cv.resize(frame, (0, 0), fx=0.25, fy=0.25)  # scale down to 25%
    frame = cv.cvtColor(frame, cv.COLOR_BGR2RGB)  # convert to rgb

    face_locations = fr.face_locations(frame)
    face_encodings = fr.face_encodings(frame, face_locations)

    for (face_location, face_encoding) in zip(face_locations, face_encodings):
        front_callback(face_encoding) if front else back_callback(
            frame, face_location, face_encoding)


def back_callback(frame, face_location, face_encoding):
    # if face list is empty, add and continue
    print("back_callback")
    people = load_encodings()
    if not len(people):
        return

    # (top, right, bottom, left) = face_location
    # crop = frame[left:right, top:bottom]
    meta = DeepFace.analyze(frame, actions=('emotion', 'gender', 'race'))
    print(meta)

    results = compare_faces(people, face_encoding)
    for (_, result, i) in zip(people, results, range(len(people)), strict=True):
        if not result:
            continue
        print("Person exited restaurant. Removing face")
        delete_encoding_at(i, meta)
        break


def front_callback(face_encoding):
    # if face list is empty, add and continue
    print("front_callback")
    people = load_encodings()
    if not len(people):
        new_face_callback(face_encoding)
        return

    results = compare_faces(people, face_encoding)
    if True not in results:  # existing face not detected
        new_face_callback(face_encoding)
    else:
        print("Found existing face")


def new_face_callback(encoding):
    print("Found new face. Customer #" + str(get_count()))
    add_encoding(list(encoding))


def gamma_transform(frame):
    gamma = 1.5
    for row in frame:
        for value in row:
            value[0] *= gamma
            value[1] *= gamma
            value[2] *= gamma


def run_camera(num: int, front: bool):
    window_name = 'frame' + str(num)
    stream = cv.VideoCapture(num)

    frame_count = 0
    thread = None
    while True:
        _, frame = stream.read()

        if cv.waitKey(1) & 0xFF == ord('q'):
            break

        # get every 5th frame
        frame_count += 1
        if frame_count % 5 == 0:
            gamma_transform(frame)
            if thread:
                thread.join()
            thread = threading.Thread(
                target=thread_callback, args=(frame, front), daemon=True)
            thread.start()
            cv.imshow(window_name, frame)

    stream.release()
    cv.destroyWindow(window_name)


people = load_encodings()

# run front camera
run_camera(0, True)

# run back camera
run_camera(0, False)

redis_db.delete(key)
redis_db.delete(count_key)
threading._shutdown()
cv.destroyAllWindows()
