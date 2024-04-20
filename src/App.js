import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';


function App() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [editingId, setEditingId] = useState(null);

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
      const updatedContact = { name, phone };
      await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updatedContact);
      const updatedContacts = contacts.map(contact =>
        contact.id === id ? { ...contact, ...updatedContact } : contact
      );
      setContacts(updatedContacts);
      setEditingId(null);
      setName('');
      setPhone('');
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      setContacts(contacts.filter(contact => contact.id !== id));
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const handleEdit = (id, currentName, currentPhone) => {
    setEditingId(id);
    setName(currentName);
    setPhone(currentPhone);
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
        <button className="btn btn-primary mr-3" onClick={editingId ? () => handleUpdateContact(editingId) : handleAddContact}>
          {editingId ? 'Update Contact' : 'Add Contact'}
        </button>
      </div>
      <ul className="list-group">
        {contacts.map(contact => (
          <li key={contact.id} className="list-group-item d-flex justify-content-between align-items-center">
            {editingId === contact.id ? (
              <div>
                <input
                  type="text"
                  className="form-control mb-2"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="text"
                  className="form-control"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            ) : (
              <div>
                <strong>{contact.name}</strong>: {contact.phone}
              </div>
            )}
            <div>
              {editingId === contact.id ? (
                <button className="btn btn-success mr-2" onClick={() => handleUpdateContact(contact.id)}>Save</button>
              ) : (
                <>
                  <button className="btn btn-info mr-2" onClick={() => handleEdit(contact.id, contact.name, contact.phone)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDeleteContact(contact.id)}>Delete</button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
