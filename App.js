import React, { useState } from 'react';
import './App.css';


function App() {
  const [patients, setPatients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [reason, setReason] = useState('');
  const [editing, setEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleHideModal = () => {
    setShowModal(false);
    setName('');
    setPhoneNumber('');
    setAge('');
    setGender('');
    setReason('');
    setEditing(false);
    setEditingIndex(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phoneNumber || !age || !gender || !reason) {
      alert('Please fill in all fields');
      return;
    }
    if (!/^[a-zA-Z]+$/.test(name)) {
      alert('Name can only contain alphabets');
      return;
    }
    if (!/^\d{10}$/.test(phoneNumber)) {
      alert('Phone number must be 10 digits');
      return;
    }
    const newPatient = {
      name,
      phoneNumber,
      age,
      gender,
      reason,
    };
    if (editing) {
      patients[editingIndex] = newPatient;
      setPatients([...patients]);
    } else {
      setPatients([...patients, newPatient]);
    }
    handleHideModal();
  };

  const handleEdit = (index) => {
    setEditing(true);
    setEditingIndex(index);
    const patient = patients[index];
    setName(patient.name);
    setPhoneNumber(patient.phoneNumber);
    setAge(patient.age);
    setGender(patient.gender);
    setReason(patient.reason);
    handleShowModal();
  };

  const handleDelete = (index) => {
    setPatients(patients.filter((patient, i) => i !== index));
  };

  return (
    <div className="App">

          <nav className="navbar">
          <div className="navbar-left">
            <div className="nav-logo">
              <div className="logo"></div>
            </div>
          </div>
          <ul className="navbar-right">
            <li>
              <a href="#">Exercise</a>
            </li>
            <li>
              <a href="#">Goal Assessment</a>
            </li>
            <li>
              <a href="#">Game</a>
            </li>
            <li>
              <a href="#">Setup</a>
            </li>
            <li>
              <a href="#">Play</a>
            </li>
          </ul>
        </nav>
      <h1>PATIENT LIST</h1>
      <button onClick={handleShowModal}>ADD PATIENT</button>
      <ul>
        {patients.map((patient, index) => (
          <li key={index}>
            <span>
              {patient.name} ({patient.phoneNumber}) - {patient.age} years old - {patient.gender}
            </span>
            <button onClick={() => handleEdit(index)}>Edit</button>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{editing ? 'Edit Patient' : 'Add Patient'}</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <br />
              <label>
                Phone Number:
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </label>
              <br />
              <label>
                Age:
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </label>
              <br />
              <label>
                Gender:
                <select value={gender} onChange={(e) => setGender(e.target.value)}>
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </label>
              <br />
              <label>
                Reason for Visit:
                <textarea value={reason} onChange={(e) => setReason(e.target.value)} />
              </label>
              <br />
              <button type="submit">Submit</button>
              <button type="cancel" onClick={handleHideModal}>Cancel</button>
              
            </form>
          </div>
        </div>
      
      )}
    </div>
  );
}


export default App;

