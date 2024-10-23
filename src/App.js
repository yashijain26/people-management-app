import React, { useEffect, useState } from "react";
import PersonForm from "./components/PersonForm";
import PeopleList from "./components/PeopleList";
import PersonDetailsModal from "./components/PersonDetailsModal";

const BASE_URL = "https://sendmail.iconsjo.space/REST/ppl";

const App = () => {
  const [people, setPeople] = useState([]);
  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    dob: "",
    description: "",
    is_male: false,
  });
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPerson, setSelectedPerson] = useState(null); // For modal
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch people from the API on component mount
  const fetchPeopleFromAPI = async () => {
    try {
      const response = await fetch(BASE_URL);
      const data = await response.json();
      console.log("Fetched data:", data);
      if (data.success && Array.isArray(data.data)) {
        setPeople(data.data);
      } else {
        console.error("Fetched data is not an array:", data);
      }
    } catch (error) {
      console.error("Error fetching people:", error);
    }
  };

  useEffect(() => {
    fetchPeopleFromAPI();
  }, []);

  const addOrUpdatePerson = async (person) => {
    try {
      let response;
      if (editingId) {
        response = await fetch(`${BASE_URL}?id=${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        });
      } else {
        response = await fetch(BASE_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        });
      }

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Error saving person: ${errorMessage}`);
      }

      const data = await response.json();
      resetForm();
      fetchPeopleFromAPI();
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Error saving person. Please try again.");
    }
  };

  const deletePerson = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Error deleting person: ${errorMessage}`);
      }

      const result = await response.json();
      if (result.success || result.Success) {
        fetchPeopleFromAPI();
        setErrorMessage("");
      } else {
        setErrorMessage("Failed to delete person.");
      }
    } catch (error) {
      setErrorMessage("Error deleting person. Please try again.");
    }
  };

  const filteredPeople = people.filter(
    (person) =>
      person.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const resetForm = () => {
    setFormData({
      first_name: "",
      middle_name: "",
      last_name: "",
      email: "",
      dob: "",
      description: "",
      is_male: false,
    });
    setEditingId(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">People Management App</h1>

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <PersonForm
        formData={formData}
        setFormData={setFormData}
        handleSubmit={(e) => {
          e.preventDefault();
          addOrUpdatePerson(formData);
        }}
        editingId={editingId}
      />

      <input
        type="text"
        placeholder="Search by name or email..."
        className="border border-gray-300 p-2 mb-4 rounded w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <PeopleList
        people={filteredPeople}
        deletePerson={deletePerson}
        setEditingId={setEditingId}
        setFormData={setFormData}
        setSelectedPerson={setSelectedPerson} // Pass to PeopleList
      />

      {selectedPerson && (
        <PersonDetailsModal
          person={selectedPerson}
          onClose={() => setSelectedPerson(null)} // Close modal
        />
      )}
    </div>
  );
};

export default App;
