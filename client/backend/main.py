from flask import Flask, request, jsonify
import cv2
import dlib
import numpy as np
import face_recognition
import pickle
import os
import csv
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Create the necessary directories
if not os.path.exists('face_data'):
    os.makedirs('face_data')

@app.route('/capture', methods=['POST'])
def capture_face_data():
    roll_number = request.json['roll_number']
    name = request.json['name']
    num_images = 20
    detector = dlib.get_frontal_face_detector()
    cap = cv2.VideoCapture(0)
    
    face_data = []
    count = 0
    
    print(f"Capturing face data. Please wait...")
    while count < num_images:
        ret, frame = cap.read()
        if not ret:
            continue
        
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        faces = face_recognition.face_locations(rgb_frame)
        
        for face in faces:
            top, right, bottom, left = face
            cv2.rectangle(frame, (left, top), (right, bottom), (0, 255, 0), 2)
            face_encoding = face_recognition.face_encodings(rgb_frame, [face])[0]
            face_data.append(face_encoding)
            count += 1
            print(f"Captured image {count}/{num_images}")
        
        cv2.imshow('Capturing Face Data', frame)
        
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    
    cap.release()
    cv2.destroyAllWindows()
    
    with open(f'face_data/{roll_number}_{name}.pkl', 'wb') as f:
        pickle.dump(face_data, f)
    
    return jsonify({"message": f"Face data saved for {name} with roll number {roll_number}."})

def load_face_data():
    face_encodings = []
    face_labels = []
    for file in os.listdir('face_data'):
        if file.endswith('.pkl'):
            with open(os.path.join('face_data', file), 'rb') as f:
                face_data = pickle.load(f)
                roll_number, name = file.split('_')[0], file.split('_')[1].replace('.pkl', '')
                for face_encoding in face_data:
                    face_encodings.append(face_encoding)
                    face_labels.append((roll_number, name))
    return face_encodings, face_labels

@app.route('/recognize', methods=['POST'])
def recognize_and_mark_attendance():
    face_encodings, face_labels = load_face_data()
    if not face_encodings:
        return jsonify({"message": "No face data found. Please capture face data first."})
    
    cap = cv2.VideoCapture(0)
    attendance_list = []
    recognized_names = []

    def write_to_csv(name, roll_number):
        with open('client/frontend/public/attendance/attendance.csv', mode='a', newline='') as file:
            writer = csv.writer(file)
            writer.writerow([datetime.now().strftime('%Y-%m-%d %H:%M:%S'), name, roll_number])

    while True:
        ret, frame = cap.read()
        if not ret:
            continue
        
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        faces = face_recognition.face_locations(rgb_frame)
        face_encodings_current_frame = face_recognition.face_encodings(rgb_frame, faces)
        
        for face_encoding, face_location in zip(face_encodings_current_frame, faces):
            matches = face_recognition.compare_faces(face_encodings, face_encoding)
            face_distances = face_recognition.face_distance(face_encodings, face_encoding)
            best_match_index = np.argmin(face_distances)
            
            if matches[best_match_index]:
                roll_number, name = face_labels[best_match_index]
                recognized_names.append(name)
                top, right, bottom, left = face_location
                cv2.rectangle(frame, (left, top), (right, bottom), (0, 255, 0), 2)
                cv2.putText(frame, f"{name} ({roll_number})", (left, top - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (36, 255, 12), 2)
                
                if (name, roll_number) not in attendance_list:
                    attendance_list.append((name, roll_number))
                    write_to_csv(name, roll_number)
                    print(f"Marked present: {name} ({roll_number})")
            else:
                print("No match found.")
        
        cv2.imshow('Face Recognition and Attendance', frame)
        
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    
    cap.release()
    cv2.destroyAllWindows()

    return jsonify({"recognized": recognized_names})

if __name__ == "__main__":
    app.run(debug=True)
