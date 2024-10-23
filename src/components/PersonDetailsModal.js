import React from "react";

const PersonDetailsModal = ({ person, onClose }) => {
  if (!person) return null; // If no person is selected, return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Person Details</h2>
        <p><strong>First Name:</strong> {person.first_name}</p>
        <p><strong>Middle Name:</strong> {person.middle_name}</p>
        <p><strong>Last Name:</strong> {person.last_name}</p>
        <p><strong>Email:</strong> {person.email}</p>
        <p><strong>Date of Birth:</strong> {new Date(person.dob).toLocaleDateString()}</p>
        <p><strong>Description:</strong> {person.description}</p>
        <p><strong>Gender:</strong> {person.is_male ? "Male" : "Female"}</p>
        <button 
          onClick={onClose} 
          className="mt-4 bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400 transition duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PersonDetailsModal;
