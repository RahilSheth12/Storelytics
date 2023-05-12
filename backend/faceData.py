from deepface import DeepFace
import cv2 as cv


def getInformation(img):
    analysis = DeepFace.analyze(img, actions=['race', 'emotion', 'gender'])

    data = {'gender': analysis['gender'], 'race': analysis['dominant_race'],
            'emotion': analysis['dominant_emotion']}

    return data


image = cv.imread("./data/rahil_neutral.JPG")
# image1 = cv.imread("./data/rahil_mad.JPG")
# image2 = cv.imread("./data/rahil_happy.JPG")
print(getInformation(image))
# print(getInformation(image1))
# print(getInformation(image2))
# prints {'gender': 'Man', 'race': 'white', 'emotion': 'neutral'}
