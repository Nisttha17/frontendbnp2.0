import React from 'react';
import { Search, FileSpreadsheet } from 'lucide-react';
import { ChangeRequest } from '../types';

interface ChangeRequestsTableProps {
  requests: ChangeRequest[];
  selectedRequestId: string | null;
  onSelectRequest: (request: ChangeRequest) => void;
  onOpenNewModal: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter?: string;
  setStatusFilter?: (filter: string) => void;
}

export const ChangeRequestsTable: React.FC<ChangeRequestsTableProps> = ({
  requests,
  selectedRequestId,
  onSelectRequest,
  onOpenNewModal,
  searchTerm,
  setSearchTerm,
}) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return (
          <span className="bg-emerald-100 text-emerald-700 font-medium px-3 py-0.5 rounded-full text-xs inline-block">
            Completed
          </span>
        );
      case 'In Progress':
        return (
          <span className="bg-blue-100 text-blue-700 font-medium px-3 py-0.5 rounded-full text-xs inline-block">
            In Progress
          </span>
        );
      case 'Pending':
        return (
          <span className="bg-slate-100 text-slate-600 font-medium px-3 py-0.5 rounded-full text-xs inline-block">
            Pending
          </span>
        );
      case 'Needs Review':
        return (
          <span className="bg-amber-100 text-amber-700 font-medium px-3 py-0.5 rounded-full text-xs inline-block">
            Needs Review
          </span>
        );
      case 'Rejected':
        return (
          <span className="bg-red-100 text-red-700 font-medium px-3 py-0.5 rounded-full text-xs inline-block">
            Rejected
          </span>
        );
      default:
        return (
          <span className="bg-slate-100 text-slate-600 font-medium px-3 py-0.5 rounded-full text-xs inline-block">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-xs mb-6 overflow-hidden">
      {/* Table Header Section */}
      <div className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#0c1538]">Change Requests</h2>
            <p className="text-xs text-slate-500">
              Select a request from your dataset or enter a new one.
            </p>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search Input */}
          <div className="relative min-w-[240px] sm:w-72">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by request ID or description..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white placeholder-slate-400 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            />
          </div>

          {/* New Request Button */}
          <button
            onClick={onOpenNewModal}
            className="bg-[#0b1b4f] hover:bg-[#132766] text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer active:scale-[0.98] shadow-xs"
          >
            New Request
          </button>
        </div>
      </div>

      {/* Table Content (Complexity Column Removed) */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-700">
              <th className="py-3 px-4 w-28">Sr. No.</th>
              <th className="py-3 px-4">Change Request</th>
              <th className="py-3 px-4 w-36">Status</th>
              <th className="py-3 px-4 w-36">Date</th>
              <th className="py-3 px-4 w-20 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {requests.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-slate-400 text-xs">
                  No matching change requests found.
                </td>
              </tr>
            ) : (
              requests.map((req) => {
                const isSelected = req.id === selectedRequestId;
                return (
                  <tr
                    key={req.id}
                    onClick={() => onSelectRequest(req)}
                    className={`cursor-pointer transition-colors hover:bg-slate-50/80 ${
                      isSelected ? 'bg-blue-50/30' : ''
                    }`}
                  >
                    <td className="py-3.5 px-4 font-semibold text-[#0c1538] relative">
                      {/* Active Left Indicator Bar */}
                      {isSelected && (
                        <span className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r" />
                      )}
                      {req.srNo}
                    </td>
                    <td className="py-3.5 px-4 text-slate-800 font-normal pr-6">
                      <p className="truncate max-w-xl">{req.description}</p>
                    </td>
                    <td className="py-3.5 px-4">{getStatusBadge(req.status)}</td>
                    <td className="py-3.5 px-4 text-slate-600 font-normal">{req.date}</td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectRequest(req);
                        }}
                        className="border border-slate-200 text-slate-700 hover:bg-white hover:border-slate-300 font-medium px-3 py-1 rounded-md text-xs transition-colors cursor-pointer shadow-2xs"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
