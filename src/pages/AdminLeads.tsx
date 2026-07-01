import { useState } from "react";
import { Download } from "lucide-react";
import AdminGate from "./admin/AdminGate";
import LeadsTable from "./admin/LeadsTable";
import DiscoveryList from "./admin/DiscoveryList";
import SelfTestBanner from "./admin/SelfTestBanner";
import { exportDiscoveryCsv, exportLeadsCsv } from "./admin/exports";
import type { Discovery, Submission } from "./admin/types";

const AdminLeads = () => {
  const [credentials, setCredentials] = useState<{ email: string; password: string } | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [discovery, setDiscovery] = useState<Discovery[]>([]);
  const [tab, setTab] = useState<"leads" | "discovery">("leads");

  if (!credentials) {
    return (
      <AdminGate
        onAuthenticated={(creds, data) => {
          setCredentials(creds);
          setSubmissions(data.submissions);
          setDiscovery(data.discovery);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-base p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-text">Submissions</h1>
            <p className="text-sm text-mute mt-1">
              {submissions.length} contact · {discovery.length} discovery
            </p>
          </div>
          <SelfTestBanner credentials={credentials} />
        </div>

        <div className="flex gap-2 mb-6 border-b border-line">
          <button
            onClick={() => setTab("leads")}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${tab === "leads" ? "border-accent text-text" : "border-transparent text-mute hover:text-text"}`}
          >
            Quick Leads ({submissions.length})
          </button>
          <button
            onClick={() => setTab("discovery")}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${tab === "discovery" ? "border-accent text-text" : "border-transparent text-mute hover:text-text"}`}
          >
            NM Discovery ({discovery.length})
          </button>
          <div className="ml-auto pb-2">
            <button
              onClick={() => (tab === "leads" ? exportLeadsCsv(submissions) : exportDiscoveryCsv(discovery))}
              disabled={tab === "leads" ? submissions.length === 0 : discovery.length === 0}
              className="text-xs px-3 py-2 border border-line rounded-lg text-mute hover:text-text hover:border-accent/40 transition-colors disabled:opacity-30 flex items-center gap-2"
              title={`Download ${tab === "leads" ? "quick leads" : "discovery"} as CSV`}
            >
              <Download className="w-3 h-3" />
              Export CSV
            </button>
          </div>
        </div>

        {tab === "leads" && <LeadsTable submissions={submissions} />}
        {tab === "discovery" && <DiscoveryList discovery={discovery} />}
      </div>
    </div>
  );
};

export default AdminLeads;
