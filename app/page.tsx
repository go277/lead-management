"use client";

import emailjs from "@emailjs/browser";
import { useState } from "react";
import Link from "next/link";
import {
  User,
  Mail,
  Phone,
  Building2,
  FileText,
  ShieldCheck,
  Zap,
  BarChart3,
  Cloud,
  Sparkles,
  Lock,
  ArrowRight,
  Users
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
    await emailjs.send(
      "service_be5y96a",
      "template_afa7a0q",
      {
        name: form.name,
        email: form.email,
        requirement: form.requirement,
      },
      "pKj5-f2EH5pf6tTSp"
    );

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
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans relative overflow-hidden flex flex-col justify-between">
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/2" />

      {/* Navigation Header */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-200">
            <Users className="text-white" size={22} />
          </div>
          <span className="text-2xl font-bold tracking-tight text-slate-900">LeadPro</span>
        </div>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium text-sm shadow-md shadow-indigo-100 transition-all active:scale-95"
        >
          Go to Dashboard <ArrowRight size={16} />
        </Link>
      </header>

      {/* Main Content Split */}
      <main className="w-full max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row items-center justify-between gap-12 z-10 my-auto">
        
        {/* Left Column: Hero Copy */}
        <div className="flex-1 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-semibold mb-6">
            <Sparkles size={14} />
            <span>Smart Lead Management</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
            Capture Leads. <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Grow Your Business.
            </span>
          </h1>

          <p className="text-lg text-slate-600 mt-6 leading-relaxed">
            Easily collect, manage, and track leads in one place. We&apos;ll take care of the rest!
          </p>

          {/* Feature Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12 pt-8 border-t border-slate-200/60">
            <div className="flex flex-col items-start gap-2">
              <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
                <ShieldCheck size={22} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Secure & Reliable</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Your data is safe</p>
              </div>
            </div>

            <div className="flex flex-col items-start gap-2">
              <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
                <Zap size={22} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Instant Alerts</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Get notified fast</p>
              </div>
            </div>

            <div className="flex flex-col items-start gap-2">
              <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
                <BarChart3 size={22} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Powerful Analytics</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Track & grow</p>
              </div>
            </div>

            <div className="flex flex-col items-start gap-2">
              <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600">
                <Cloud size={22} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Cloud Database</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Always synced</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Form Card */}
        <div className="w-full lg:w-[520px] bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 sm:p-10 relative">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-12 w-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
              <User size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Submit a Lead</h3>
              <p className="text-xs text-slate-500 mt-0.5">Fill in the details below and we&apos;ll get back to you.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <User size={16} className="absolute left-3.5 text-slate-400" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <Mail size={16} className="absolute left-3.5 text-slate-400" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Phone */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <Phone size={16} className="absolute left-3.5 text-slate-400" />
                  <input
                    type="text"
                    name="phone"
                    placeholder="Enter phone number"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>
              </div>

              {/* Company */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Company / Organization
                </label>
                <div className="relative flex items-center">
                  <Building2 size={16} className="absolute left-3.5 text-slate-400" />
                  <input
                    type="text"
                    name="company"
                    placeholder="Enter company name"
                    value={form.company}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>
              </div>
            </div>

            {/* Requirement */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Requirement / Message <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FileText size={16} className="absolute left-3.5 top-3 text-slate-400" />
                <textarea
                  name="requirement"
                  placeholder="Tell us about your requirement..."
                  value={form.requirement}
                  onChange={handleChange}
                  rows={4}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none resize-none transition focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2"
            >
              <span>🚀</span> Submit Lead
            </button>

            <div className="flex items-center justify-center gap-1.5 pt-2 text-slate-400">
              <Lock size={12} />
              <span className="text-[11px]">We respect your privacy. Your information is safe with us.</span>
            </div>
          </form>
        </div>
      </main>
      
      <footer className="w-full py-6 text-center text-xs text-slate-400">
        &copy; {new Date().getFullYear()} LeadPro Inc. All rights reserved.
      </footer>
    </div>
  );
}