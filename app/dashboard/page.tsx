export const dynamic = "force-dynamic";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { 
  BarChart3, 
  Users, 
  TrendingUp, 
  Building2, 
  Mail, 
  Clock, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Trash2,
  Calendar
} from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function Dashboard() {
  const { data: leads, error } = await supabase
    .from("leads")
    .select("*")
    .order("submitted_at", { ascending: false });

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-red-100 text-center">
          <h1 className="text-red-600 font-bold text-lg mb-1">Database Connection Error</h1>
          <p className="text-slate-500 text-sm">{error.message}</p>
        </div>
      </div>
    );
  }

  // Calculate distinct companies for KPI card
  const uniqueCompanies = new Set(leads?.map((l: any) => l.company).filter(Boolean)).size;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans pb-16">
      
      {/* Top App Bar */}
      <header className="bg-white border-b border-slate-200/80 px-8 py-4 mb-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
              LP
            </div>
            <span className="font-bold text-lg text-slate-900">LeadPro</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">
              AD
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Title & Date Selector Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100/50">
              <BarChart3 size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 leading-tight">Dashboard</h1>
              <p className="text-xs text-slate-500">Overview of your leads and recent activity.</p>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-600 shadow-sm">
            <Calendar size={14} className="text-slate-400" />
            <span>May 21, 2025 - May 28, 2025</span>
          </div>
        </div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          
          {/* Total Leads */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl shrink-0">
              <Users size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400">Total Leads</p>
              <h3 className="text-2xl font-black text-slate-800 mt-0.5">{leads?.length || 0}</h3>
              <p className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5 mt-1">
                <span>↗ 12%</span> <span className="font-normal text-slate-400">from last week</span>
              </p>
            </div>
          </div>

          {/* Today's Leads */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl shrink-0">
              <TrendingUp size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400">Today&apos;s Leads</p>
              <h3 className="text-2xl font-black text-slate-800 mt-0.5">12</h3>
              <p className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5 mt-1">
                <span>↗ 8%</span> <span className="font-normal text-slate-400">from yesterday</span>
              </p>
            </div>
          </div>

          {/* Companies */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl shrink-0">
              <Building2 size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400">Companies</p>
              <h3 className="text-2xl font-black text-slate-800 mt-0.5">{uniqueCompanies}</h3>
              <p className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5 mt-1">
                <span>↗ 15%</span> <span className="font-normal text-slate-400">from last week</span>
              </p>
            </div>
          </div>

          {/* Emails Sent */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl shrink-0">
              <Mail size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400">Emails Sent</p>
              <h3 className="text-2xl font-black text-slate-800 mt-0.5">{leads?.length || 0}</h3>
              <p className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5 mt-1">
                <span>↗ 10%</span> <span className="font-normal text-slate-400">from last week</span>
              </p>
            </div>
          </div>

          {/* Pending Follow-ups */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-rose-50 text-rose-600 rounded-xl shrink-0">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400">Pending Follow-ups</p>
              <h3 className="text-2xl font-black text-slate-800 mt-0.5">18</h3>
              <p className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5 mt-1">
                <span>↗ 5%</span> <span className="font-normal text-slate-400">from last week</span>
              </p>
            </div>
          </div>

        </div>

        {/* Table Card Section */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          
          {/* Table Toolbar */}
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="font-bold text-base text-slate-800">Recent Leads</h3>
            
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search leads..." 
                  className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 placeholder:text-slate-400 outline-none w-48 focus:bg-white focus:border-indigo-500 transition"
                />
              </div>
              
              <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 hover:bg-slate-50 rounded-lg text-xs font-semibold text-slate-600 transition">
                <Filter size={13} /> Filter
              </button>

              <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 hover:bg-slate-50 rounded-lg text-xs font-semibold text-slate-600 transition">
                <Download size={13} /> Export
              </button>
            </div>
          </div>

          {/* Table Data */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-semibold bg-slate-50/50">
                  <th className="py-3.5 pl-6 pr-4">Name</th>
                  <th className="py-3.5 px-4">Email</th>
                  <th className="py-3.5 px-4">Phone</th>
                  <th className="py-3.5 px-4">Company</th>
                  <th className="py-3.5 px-4">Requirement</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 pl-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leads?.map((lead: any) => (
                  <tr
                    key={lead.id}
                    className="border-b border-slate-100 hover:bg-slate-50 transition"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                          {lead.name?.charAt(0).toUpperCase()}
                        </div>

                        <div>
                          <p className="font-semibold text-slate-900">
                            {lead.name}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      {lead.email}
                    </td>

                    <td className="px-6 py-5">
                      {lead.phone}
                    </td>

                    <td className="px-6 py-5">
                      {lead.company || "-"}
                    </td>

                    <td className="px-6 py-5 max-w-xs truncate">
                      {lead.requirement}
                    </td>

                    <td className="px-6 py-5">
                      {new Date(
                        lead.submitted_at || lead.created_at
                      ).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-5">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                        New
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

      </main>
    </div>
  );
}