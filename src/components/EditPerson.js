import React, { useState, useEffect } from 'react';

function EditPerson({ person, updatePerson }) {
  const [editedPerson, setEditedPerson] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    email: '',
    dob: '',
    is_male: false,
    description: ''
  });

  useEffect(() => {
    if (person) {
      setEditedPerson(person); // Sync the state when person prop changes
    }
  }, [person]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedPerson({
      ...editedPerson,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePerson(editedPerson);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          name="first_name"
          value={editedPerson.first_name || ''} // Ensure it defaults to an empty string
          onChange={handleChange}
          placeholder="First Name"
          className="input"
        />
        <input
          type="text"
          name="middle_name"
          value={editedPerson.middle_name || ''} // Ensure it defaults to an empty string
          onChange={handleChange}
          placeholder="Middle Name"
          className="input"
        />
        <input
          type="text"
          name="last_name"
          value={editedPerson.last_name || ''} // Ensure it defaults to an empty string
          onChange={handleChange}
          placeholder="Last Name"
          className="input"
        />
        <input
          type="email"
          name="email"
          value={editedPerson.email || ''} // Ensure it defaults to an empty string
          onChange={handleChange}
          placeholder="Email"
          className="input"
        />
        <input
          type="date"
          name="dob"
          value={editedPerson.dob || ''} // Ensure it defaults to an empty string
          onChange={handleChange}
          className="input"
        />
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="is_male"
              checked={editedPerson.is_male}
              onChange={handleChange}
              className="mr-2"
            />
            Is Male
          </label>
        </div>
        <textarea
          name="description"
          value={editedPerson.description || ''} // Ensure it defaults to an empty string
          onChange={handleChange}
          placeholder="Description"
          className="input h-24"
        />
      </div>
      <button type="submit" className="btn mt-4">Save Changes</button>
    </form>
  );
}

export default EditPerson;
