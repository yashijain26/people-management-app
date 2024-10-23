import React from "react";

const PersonForm = ({ formData, setFormData, handleSubmit, editingId }) => {
  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        placeholder="First Name"
        value={formData.first_name}
        onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
        required
        className="border border-gray-300 p-2 mb-2 rounded w-full"
      />
      <input
        type="text"
        placeholder="Middle Name"
        value={formData.middle_name}
        onChange={(e) => setFormData({ ...formData, middle_name: e.target.value })}
        className="border border-gray-300 p-2 mb-2 rounded w-full"
      />
      <input
        type="text"
        placeholder="Last Name"
        value={formData.last_name}
        onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
        required
        className="border border-gray-300 p-2 mb-2 rounded w-full"
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
        className="border border-gray-300 p-2 mb-2 rounded w-full"
      />
      <input
        type="date"
        placeholder="Date of Birth"
        value={formData.dob}
        onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
        className="border border-gray-300 p-2 mb-2 rounded w-full"
      />
      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="border border-gray-300 p-2 mb-2 rounded w-full"
      ></textarea>
      <div>
        <label>
          <input
            type="checkbox"
            checked={formData.is_male}
            onChange={(e) => setFormData({ ...formData, is_male: e.target.checked })}
          />
          Male
        </label>
      </div>
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        {editingId ? "Update Person" : "Add Person"}
      </button>
    </form>
  );
};

export default PersonForm;
