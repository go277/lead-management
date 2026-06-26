import { createClient } from "@supabase/supabase-js";

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
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-red-500 text-xl">{error.message}</h1>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 p-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">📊 Lead Dashboard</h1>

        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-xl font-semibold">
            Total Leads: {leads?.length || 0}
          </h2>
        </div>

        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="w-full">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Company</th>
                <th className="p-4">Requirement</th>
              </tr>
            </thead>

            <tbody>
              {leads?.map((lead: any) => (
                <tr key={lead.id} className="border-b text-center">
                  <td className="p-4">{lead.name}</td>
                  <td className="p-4">{lead.email}</td>
                  <td className="p-4">{lead.phone}</td>
                  <td className="p-4">{lead.company || "-"}</td>
                  <td className="p-4">{lead.requirement}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}