import React, { useState, useMemo } from 'react';
import { History, ArrowLeft, Filter, Download, Search, CheckCircle2 } from 'lucide-react';
import { AssessmentItem } from '../types';

interface HistoryViewProps {
  assessments: AssessmentItem[];
  onBackToDashboard: () => void;
  onSelectRequest: (requestId: string) => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  assessments,
  onBackToDashboard,
  onSelectRequest,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);

  const filteredAssessments = useMemo(() => {
    return assessments.filter((a) => {
      const matchesSearch =
        a.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.requestId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.summary.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === 'All' || a.status.toLowerCase() === statusFilter.toLowerCase();
      return matchesSearch && matchesStatus;
    });
  }, [assessments, searchTerm, statusFilter]);

  const handleExport = () => {
    // CSV export simulation
    const headers = ['Assessment ID', 'Date & Time', 'Target Request', 'Final Status', 'Finding Summary'];
    const rows = filteredAssessments.map((a) => [
      a.id,
      `"${a.dateTime}"`,
      a.requestId,
      a.status,
      `"${a.summary}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `IMPART_Audit_Trail_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToDashboard}
            className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer shadow-2xs"
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-[#0B1739] tracking-tight">
              Regulatory Audit History
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Immutable ledger of change request assessments, approvals, and jurisdictional parity checks.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExport}
            className="px-3.5 py-2 text-xs font-semibold rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 shadow-2xs cursor-pointer active:scale-95 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{copiedNotification ? 'Exported CSV!' : 'Export Audit Trail'}</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by ID, CR or summary..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white placeholder-slate-400 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          {['All', 'Completed', 'Needs Review', 'In Progress'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                statusFilter === status
                  ? 'bg-[#0B1739] text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Historical Ledger Card */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <History className="w-4 h-4" />
            </div>
            <h2 className="text-base font-bold text-slate-900">Historical Ledger</h2>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Showing {filteredAssessments.length} of {assessments.length} assessment runs
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-700 font-semibold bg-slate-50/60">
                <th className="py-3 px-5">Assessment ID</th>
                <th className="py-3 px-5">Date & Time</th>
                <th className="py-3 px-5">Target Request</th>
                <th className="py-3 px-5">Final Status</th>
                <th className="py-3 px-5">Finding Summary</th>
                <th className="py-3 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAssessments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    No matching audit logs found.
                  </td>
                </tr>
              ) : (
                filteredAssessments.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-5 font-mono text-slate-500">{a.id}</td>
                    <td className="py-3.5 px-5 text-slate-700">{a.dateTime}</td>
                    <td className="py-3.5 px-5 font-bold text-slate-900">{a.requestId}</td>
                    <td className="py-3.5 px-5">
                      <span
                        className={`px-2.5 py-0.5 rounded-full font-medium text-[11px] ${
                          a.status === 'Completed'
                            ? 'bg-emerald-100 text-emerald-700'
                            : a.status === 'In Progress'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {a.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-slate-700">{a.summary}</td>
                    <td className="py-3.5 px-5 text-right">
                      <button
                        onClick={() => {
                          onSelectRequest(a.requestId);
                        }}
                        className="text-xs font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
                      >
                        Inspect Request →
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
