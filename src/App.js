import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleAddContact = async () => {
    try {
      const newContact = { name, phone };
      const response = await axios.post('https://jsonplaceholder.typicode.com/users', newContact);
      setContacts([...contacts, response.data]);
      setName('');
      setPhone('');
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  const handleUpdateContact = async (id) => {
    try {
      const updatedContact = { name, phone }; // Updated data for the contact
      await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updatedContact);
      
      // Update the local state with the updated contact
      const updatedContacts = contacts.map(contact =>
        contact.id === id ? { ...contact, name, phone } : contact
      );
      setContacts(updatedContacts);
      
      // Clear the input fields
      setName('');
      setPhone('');
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Contact List</h1>
      <div className="mb-3">
        <input
          type="text"
          className="form-control mr-3"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          className="form-control mr-3"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button className="btn btn-primary mr-3" onClick={handleAddContact}>Add Contact</button>
      </div>
      <ul className="list-group">
        {contacts.map(contact => (
          <li key={contact.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{contact.name}</strong>: {contact.phone}
            </div>
            <div>
              <button className="btn btn-info mr-2" onClick={() => handleUpdateContact(contact.id)}>Update</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
