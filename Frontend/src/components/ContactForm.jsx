import { useState } from "react";
import axios from "axios";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [alert, setAlert] = useState({
    show: false,
    type: "",
    message: ""
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10}$/;

  const isFormValid =
    form.name.trim() &&
    emailRegex.test(form.email) &&
    phoneRegex.test(form.phone);

  const showAlert = (type, message) => {
    setAlert({ show: true, type, message });
    setTimeout(() => {
      setAlert({ show: false, type: "", message: "" });
    }, 3000);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      showAlert("error", "Please fill all fields correctly");
      return;
    }

    try {
      await axios.post("https://contact-management-gutl.onrender.com/api/contacts", form);
      showAlert("success", "Contact saved successfully!");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      showAlert(
        "error",
        error.response?.data?.error || "Something went wrong"
      );
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="bg-white text-black p-8 rounded-2xl shadow-xl
                 border border-gray-100"
    >
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Add Contact
      </h2>

      {/* Alert */}
      {alert.show && (
        <div
          className={`mb-5 p-4 rounded-lg text-sm font-medium border
          ${
            alert.type === "success"
              ? "bg-green-50 text-green-700 border-green-200"
              : alert.type === "error"
              ? "bg-red-50 text-red-700 border-red-200"
              : "bg-yellow-50 text-yellow-700 border-yellow-200"
          }`}
        >
          {alert.message}
        </div>
      )}

      {/* Name */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          type="text"
          placeholder="Enter Your Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          className="w-full px-4 py-2 border rounded-lg text-sm
                     focus:ring-2 focus:ring-black focus:outline-none
                     hover:border-gray-400 transition"
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          placeholder="Enter Your Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          className="w-full px-4 py-2 border rounded-lg text-sm
                     focus:ring-2 focus:ring-black focus:outline-none
                     hover:border-gray-400 transition"
        />
      </div>

      {/* Phone */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Phone
        </label>
        <input
          type="tel"
          placeholder="Enter the Number"
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
          className="w-full px-4 py-2 border rounded-lg text-sm
                     focus:ring-2 focus:ring-black focus:outline-none
                     hover:border-gray-400 transition"
        />
      </div>

      {/* Message */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Message 
        </label>
        <textarea
          rows="3"
          placeholder="Write a short message..."
          value={form.message}
          onChange={(e) =>
            setForm({ ...form, message: e.target.value })
          }
          className="w-full px-4 py-2 border rounded-lg text-sm
                     focus:ring-2 focus:ring-black focus:outline-none
                     hover:border-gray-400 transition resize-none"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={!isFormValid}
        className={`w-full py-2.5 rounded-lg text-sm font-semibold transition
          ${
            isFormValid
              ? "bg-black text-white hover:bg-gray-900"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
      >
        Submit
      </button>
    </form>
  );
}
