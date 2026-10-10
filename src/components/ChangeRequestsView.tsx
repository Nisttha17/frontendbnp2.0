import React, { useState, useMemo } from 'react';
import { ChangeRequestsTable } from './ChangeRequestsTable';
import { EvidencePanel } from './EvidencePanel';
import { ChangeRequest, Regulation } from '../types';
import { REGULATIONS } from '../data/mockData';
import { Filter, CheckCircle2, AlertTriangle, Clock, RefreshCw } from 'lucide-react';

interface ChangeRequestsViewProps {
  requests: ChangeRequest[];
  selectedRequestId: string | null;
  onSelectRequest: (request: ChangeRequest) => void;
  onOpenNewModal: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onApproveRequest: (reqId: string) => void;
  onRejectRequest: (reqId: string) => void;
  onOpenPdf: (title: string, page: number) => void;
  activeViolation: Regulation | null;
  setActiveViolation: (reg: Regulation) => void;
}

export const ChangeRequestsView: React.FC<ChangeRequestsViewProps> = ({
  requests,
  selectedRequestId,
  onSelectRequest,
  onOpenNewModal,
  searchTerm,
  setSearchTerm,
  onApproveRequest,
  onRejectRequest,
  onOpenPdf,
  activeViolation,
  setActiveViolation,
}) => {
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [isPanelDismissed, setIsPanelDismissed] = useState<boolean>(false);

  // Filter requests by search term and status
  const filteredRequests = useMemo(() => {
    return requests.filter((r) => {
      const matchesSearch =
        r.srNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (r.jurisdiction && r.jurisdiction.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesStatus =
        statusFilter === 'All' || r.status.toLowerCase() === statusFilter.toLowerCase();
      return matchesSearch && matchesStatus;
    });
  }, [requests, searchTerm, statusFilter]);

  // Derived selected CR
  const selectedCr = useMemo(() => {
    if (!selectedRequestId) return null;
    return requests.find((r) => r.id === selectedRequestId) || null;
  }, [requests, selectedRequestId]);

  // Derived violations for selected CR
  const violations = useMemo<Regulation[]>(() => {
    if (!selectedCr || !selectedCr.regulatoryImpacts) return [];
    return REGULATIONS.filter((reg) => selectedCr.regulatoryImpacts?.[reg] === 'NO');
  }, [selectedCr]);

  const showEvidencePanel = Boolean(selectedCr && !isPanelDismissed);

  // Status counts
  const totalCount = requests.length;
  const reviewCount = requests.filter((r) => r.status === 'Needs Review').length;
  const inProgressCount = requests.filter((r) => r.status === 'In Progress').length;
  const completedCount = requests.filter((r) => r.status === 'Completed').length;

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Filter & Metric Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <button
          onClick={() => setStatusFilter('All')}
          className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
            statusFilter === 'All'
              ? 'bg-blue-50/80 border-blue-300 ring-2 ring-blue-500/20 shadow-xs'
              : 'bg-white border-slate-200/80 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-1">
            <span>All Requests</span>
            <Filter className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="text-xl font-bold text-slate-900">{totalCount}</div>
        </button>

        <button
          onClick={() => setStatusFilter('Needs Review')}
          className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
            statusFilter === 'Needs Review'
              ? 'bg-amber-50/80 border-amber-300 ring-2 ring-amber-500/20 shadow-xs'
              : 'bg-white border-slate-200/80 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-amber-600 font-medium mb-1">
            <span>Needs Review</span>
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <div className="text-xl font-bold text-slate-900">{reviewCount}</div>
        </button>

        <button
          onClick={() => setStatusFilter('In Progress')}
          className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
            statusFilter === 'In Progress'
              ? 'bg-blue-50/80 border-blue-300 ring-2 ring-blue-500/20 shadow-xs'
              : 'bg-white border-slate-200/80 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-blue-600 font-medium mb-1">
            <span>In Progress</span>
            <Clock className="w-3.5 h-3.5 text-blue-500" />
          </div>
          <div className="text-xl font-bold text-slate-900">{inProgressCount}</div>
        </button>

        <button
          onClick={() => setStatusFilter('Completed')}
          className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
            statusFilter === 'Completed'
              ? 'bg-emerald-50/80 border-emerald-300 ring-2 ring-emerald-500/20 shadow-xs'
              : 'bg-white border-slate-200/80 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-emerald-600 font-medium mb-1">
            <span>Completed</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          </div>
          <div className="text-xl font-bold text-slate-900">{completedCount}</div>
        </button>
      </div>

      {/* Main Content Layout: Table + Evidence Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div
          className={`${
            showEvidencePanel ? 'lg:col-span-7 xl:col-span-8' : 'lg:col-span-12'
          } transition-all duration-300`}
        >
          <ChangeRequestsTable
            requests={filteredRequests}
            selectedRequestId={selectedRequestId}
            onSelectRequest={(req) => {
              onSelectRequest(req);
              setIsPanelDismissed(false);
            }}
            onOpenNewModal={onOpenNewModal}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />
        </div>

        {/* Evidence & Recommendation Panel */}
        {showEvidencePanel && selectedCr && (
          <div className="lg:col-span-5 xl:col-span-4 sticky top-6">
            <EvidencePanel
              request={selectedCr}
              violations={violations}
              activeViolation={activeViolation || violations[0] || 'EMIR'}
              onSelectViolation={(reg) => setActiveViolation(reg)}
              onApprove={onApproveRequest}
              onReject={onRejectRequest}
              onOpenPdf={onOpenPdf}
              onClose={() => setIsPanelDismissed(true)}
            />
          </div>
        )}
      </div>
    </div>
  );
};
