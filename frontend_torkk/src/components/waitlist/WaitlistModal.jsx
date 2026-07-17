"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { joinWaitlist } from "@/services/waitlistApi";

export default function WaitlistModal({ isOpen, onClose }) {
const [formData, setFormData] = useState({
  fullName: "",
  email: "",
  phone: "",
  city: "",
});

const [loading, setLoading] = useState(false);
const [success, setSuccess] = useState(false);


const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const response = await joinWaitlist(formData);

    console.log(response.data);

    setFormData({
      fullName: "",
      email: "",
      phone: "",
      city: "",
    });


setSuccess(true);

  } catch (error) {
  console.log(error);
  console.log(error.response?.data);

  alert(error.response?.data?.message || error.message);
} finally {
    setLoading(false);
  }
};


  if (!isOpen) return null;
if (success) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-lg px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl">

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <span className="text-4xl">✅</span>
        </div>

        <h2 className="mt-6 text-3xl font-bold text-gray-900">
          You're on the Waitlist!
        </h2>

        <p className="mt-3 text-gray-500">
          Thanks for joining Torkkk.
          <br />
          We'll notify you before launch.
        </p>

        <button
          onClick={() => {
            setSuccess(false);
            onClose();
          }}
          className="mt-8 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Awesome 🚀
        </button>

      </div>
    </div>
  );
}


  return (
<div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-lg px-4">    
<div className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl transition-all duration-300 scale-100">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-gray-500 transition hover:text-black"
        >
          <X size={22} />
        </button>

        {/* Heading */}
        <h2 className="text-3xl font-bold text-gray-900">
          Join Waitlist
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Be among the first to experience Torkk.
        </p>

        {/* Form */}
<form onSubmit={handleSubmit} className="mt-8 space-y-5">
         <input
  type="text"
  name="fullName"
  placeholder="Full Name"
  value={formData.fullName}
  onChange={handleChange}
  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600"
/>

         <input
  type="email"
  name="email"
  placeholder="Email Address"
  value={formData.email}
  onChange={handleChange}
  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600"
/>

        <input
  type="tel"
  name="phone"
  placeholder="Phone Number (Optional)"
  value={formData.phone}
  onChange={handleChange}
  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600"
/>

         <input
  type="text"
  name="city"
  placeholder="City (Optional)"
  value={formData.city}
  onChange={handleChange}
  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600"
/>

       <button
  type="submit"
  disabled={loading}
  className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
>
  {loading ? "Joining..." : "Join Waitlist"}
</button>

        </form>
      </div>
    </div>
  );
}