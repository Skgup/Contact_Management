import { Routes, Route, Link } from "react-router-dom";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-gray-800 text-white">
      
      {/* Header */}
      <header className="py-6 px-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center tracking-tight">
          Contact Management
        </h1>
        <p className="text-center text-gray-300 mt-2 text-sm md:text-base">
          Manage your contacts easily and efficiently
        </p>
      </header>

      <main className="px-4 pb-10">
        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Form Card */}
                <ContactForm />

              
                <Link
                  to="/contacts"
                  className="group text-black rounded-2xl shadow-xl
                             p-8 flex flex-col justify-center items-center
                             hover:shadow-2xl hover:-translate-y-1 transition
                             min-h-[260px]"
                >
                  <div className="text-5xl mb-4 group-hover:scale-110 transition">
                    📋
                  </div>

                  <h2 className="text-2xl font-semibold mb-2 text-center">
                    View Contact List
                  </h2>

                  <p className="text-gray-600 text-center mb-4">
                    See all saved contacts in one place
                  </p>

                  <span className="text-sm font-medium text-blue-600 group-hover:underline">
                    Click to open →
                  </span>
                </Link>
              </div>
            }
          />

          {/* Contact List Page */}
          <Route
            path="/contacts"
            element={
              <div className="max-w-5xl mx-auto px-2">
                <ContactList />
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
}
