import React, { useState } from "react";
import { captureFaceData } from "../api";

function AddStudent() {
  const [rollNumber, setRollNumber] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleCapture = async () => {
    try {
      const response = await captureFaceData(rollNumber, name);
      setMessage(response.data.message);
    } catch (error) {
      console.error(error);
      setMessage("Error capturing face data.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-52">
      <h1 className="text-3xl font-bold mb-6">Add Student</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Roll Number"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
          className="w-[250px] border p-2 m-5 rounded-lg"
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-[250px] border p-2 m-5 rounded-lg"
        />
      </div>
      <div className="mb-4">
        <button
          onClick={handleCapture}
          className="bg-blue-500 text-white p-2 rounded m-10"
        >
          Add New Face
        </button>
      </div>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
}

export default AddStudent;
