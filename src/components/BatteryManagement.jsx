import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import './BatteryManagement.css'
// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9ererNsNonAzH0zQo_GS79XPOyCoMxr4",
  authDomain: "waterdtection.firebaseapp.com",
  databaseURL: "https://waterdtection-default-rtdb.firebaseio.com",
  projectId: "waterdtection",
  storageBucket: "waterdtection.firebasestorage.app",
  messagingSenderId: "690886375729",
  appId: "1:690886375729:web:172c3a47dda6585e4e1810",
  measurementId: "G-TXF33Y6XY0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function MotorControlDashboard() {
  const [currentCommand, setCurrentCommand] = useState('-');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Listen for changes in Firebase
    const commandRef = ref(database, '5_Battery_Management/Motor_Commands');
    const unsubscribe = onValue(commandRef, (snapshot) => {
      const data = snapshot.val();
      setCurrentCommand(data || '-');
    });

    return () => unsubscribe();
  }, []);

  const sendCommand = async (command) => {
    try {
      const commandRef = ref(database, '5_Battery_Management/Motor_Commands');
      await set(commandRef, command);
      setMessage(`Command ${command} sent successfully!`);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="dashboard">
      <h1>Battery Management Dashboard</h1>
      
      {/* <div className="status">
        Current Command: <strong>{currentCommand}</strong>
      </div> */}
      
      <div className="control-grid">
        <button onClick={() => sendCommand('F')}>⬆️ Forward</button>
        <button onClick={() => sendCommand('L')}>⬅️ Left</button>
        <button onClick={() => sendCommand('S')}>🛑 Stop</button>
        <button onClick={() => sendCommand('R')}>➡️ Right</button>
        <button onClick={() => sendCommand('B')}>⬇️ Backward</button>
      </div>
      
      {/* {message && <div className="message">{message}</div>} */}
    </div>
  );
}

export default MotorControlDashboard;
