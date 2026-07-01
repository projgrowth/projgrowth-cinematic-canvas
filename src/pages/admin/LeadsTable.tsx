import { Check, X } from "lucide-react";
import type { Submission } from "./types";

const LeadsTable = ({ submissions }: { submissions: Submission[] }) => (
  <div className="overflow-x-auto rounded-lg border border-line">
    <table className="w-full text-sm">
      <thead>
        <tr className="bg-surface border-b border-line">
          <th className="text-left p-3 text-mute font-medium">Date</th>
          <th className="text-left p-3 text-mute font-medium">Name</th>
          <th className="text-left p-3 text-mute font-medium">Email</th>
          <th className="text-left p-3 text-mute font-medium">Message</th>
          <th className="text-left p-3 text-mute font-medium">Source</th>
          <th className="text-left p-3 text-mute font-medium">Email Sent</th>
        </tr>
      </thead>
      <tbody>
        {submissions.map((sub) => (
          <tr key={sub.id} className="border-b border-line hover:bg-surface/50 transition-colors">
            <td className="p-3 text-mute whitespace-nowrap">
              {new Date(sub.created_at).toLocaleDateString("en-US", {
                month: "short", day: "numeric", year: "numeric",
                hour: "numeric", minute: "2-digit",
              })}
            </td>
            <td className="p-3 text-text font-medium">{sub.name}</td>
            <td className="p-3">
              <a href={`mailto:${sub.email}`} className="text-accent hover:underline">{sub.email}</a>
            </td>
            <td className="p-3 text-mute max-w-xs truncate">{sub.message}</td>
            <td className="p-3 text-mute">{sub.source || "—"}</td>
            <td className="p-3">
              {sub.email_sent ? (
                <Check className="w-4 h-4 text-success" />
              ) : (
                <X className="w-4 h-4 text-destructive" />
              )}
            </td>
          </tr>
        ))}
        {submissions.length === 0 && (
          <tr>
            <td colSpan={6} className="p-8 text-center text-mute">No submissions yet</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export default LeadsTable;