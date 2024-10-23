import React from "react";

const PeopleList = ({ people, deletePerson, setEditingId, setFormData, setSelectedPerson }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">People List</h2>
      <ul className="space-y-2">
        {people.map((person) => (
          <li key={person.id} className="border p-4 rounded-md bg-white shadow-md">
            <div className="flex justify-between items-center">
              <div>
                {/* Clicking on the name opens the modal */}
                <p>
                  <span
                    className="cursor-pointer text-blue-600 hover:underline"
                    onClick={() => setSelectedPerson(person)}
                  >
                    <strong>{person.first_name} {person.last_name}</strong>
                  </span>
                </p>
                <p>{person.email}</p>
                <p>{new Date(person.dob).toLocaleDateString()}</p>
              </div>
              <div>
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => {
                    setEditingId(person.id);
                    setFormData({
                      first_name: person.first_name,
                      middle_name: person.middle_name,
                      last_name: person.last_name,
                      email: person.email,
                      dob: person.dob,
                      description: person.description,
                      is_male: person.is_male,
                    });
                  }}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => deletePerson(person.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PeopleList;
