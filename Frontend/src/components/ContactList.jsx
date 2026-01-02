/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ContactList() {
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();

  const fetchContacts = async () => {
    const res = await axios.get("https://contact-management-gutl.onrender.com/api/contacts");
    setContacts(res.data);
  };

  const deleteContact = async (id) => {
    await axios.delete(`https://contact-management-gutl.onrender.com/api/contacts/${id}`);
    fetchContacts();
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto bg-white text-black p-8 rounded-2xl shadow-xl border border-gray-100">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate("/")}
          className="text-lg font-medium bold text-blue-600 hover:underline"
        >
          ← Back to Home
        </button>

        <h2 className="text-2xl font-semibold text-gray-800">
          Contact List
        </h2>
      </div>

      {/* Empty State */}
      {contacts.length === 0 ? (
        <p className="text-center text-gray-500 py-10">
          No contacts found.
        </p>
      ) : (
        <ul className="space-y-4">
          {contacts.map((c) => (
            <li
              key={c._id}
              className="flex flex-col sm:flex-row sm:items-center 
                         sm:justify-between gap-4 p-4 border rounded-xl
                         hover:shadow-md transition"
            >
              <div>
                <p className="text-lg font-semibold text-gray-900">
                  {c.name}
                </p>
                <p className="text-sm text-gray-600">{c.email}</p>
                <p className="text-sm text-gray-600">{c.phone}</p>
              </div>

              <button
                onClick={() => deleteContact(c._id)}
                className="self-end sm:self-center
                           px-4 py-1.5 text-sm font-medium
                           text-red-600 border border-red-200
                           rounded-lg hover:bg-red-50 transition"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
