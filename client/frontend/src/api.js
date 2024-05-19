import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const captureFaceData = (rollNumber, name) => {
    return axios.post(`${API_URL}/capture`, { roll_number: rollNumber, name: name });
};

export const recognizeAndMarkAttendance = () => {
    return axios.post(`${API_URL}/recognize`);
};
