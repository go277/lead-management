"use client";

import { useState } from "react";
import Link from "next/link";
import {
  User,
  Mail,
  Phone,
  Building2,
  FileText,
  Database,
} from "lucide-react";

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    requirement: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Save Lead
    const response = await fetch("/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const result = await response.json();

    if (!result.success) {
      alert("Failed to save lead.");
      return;
    }

    // Send Email
    await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    alert("Lead Submitted & Email Sent Successfully!");

    setForm({
      name: "",
      email: "",
      phone: "",
      company: "",
      requirement: "",
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex items-center justify-center p-6">
      <div className="w-full max-w-xl rounded-3xl bg-white shadow-2xl border border-gray-200 p-8">

        {/* Logo */}
        <div className="flex justify-center">
          <div className="h-20 w-20 rounded-full bg-blue-600 flex items-center justify-center shadow-lg">
            <Database className="text-white" size={38} />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mt-5">
          Lead Management
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Capture, manage and automate your leads effortlessly.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Full Name */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <User size={16} />
              Full Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter Full Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Mail size={16} />
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter Email Address"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Phone size={16} />
              Phone Number
            </label>

            <input
              type="text"
              name="phone"
              placeholder="Enter Phone Number"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          {/* Company */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Building2 size={16} />
              Company (Optional)
            </label>

            <input
              type="text"
              name="company"
              placeholder="Enter Company Name"
              value={form.company}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          {/* Requirement */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <FileText size={16} />
              Requirement
            </label>

            <textarea
              name="requirement"
              placeholder="Describe your requirement..."
              value={form.requirement}
              onChange={handleChange}
              rows={5}
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none resize-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
          >
            🚀 Submit Lead
          </button>

          {/* Dashboard Link */}
          <Link
            href="/dashboard"
            className="block text-center text-blue-600 font-semibold hover:underline mt-3"
          >
            View Dashboard →
          </Link>
        </form>
      </div>
    </main>
  );
}