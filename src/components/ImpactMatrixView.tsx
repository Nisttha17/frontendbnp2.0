import React, { useState } from 'react';
import { ImpactMatrix } from './ImpactMatrix';
import { EvidencePanel } from './EvidencePanel';
import { ChangeRequest, Regulation } from '../types';
import { REGULATIONS } from '../data/mockData';
import { ShieldCheck, Info, Globe, AlertOctagon, CheckCircle2 } from 'lucide-react';

interface ImpactMatrixViewProps {
  requests: ChangeRequest[];
  selectedRequestId: string | null;
  activeViolation: Regulation | null;
  onSelectRequest: (request: ChangeRequest) => void;
  onSelectViolationCell: (request: ChangeRequest, regulation: Regulation) => void;
  onApproveRequest: (reqId: string) => void;
  onRejectRequest: (reqId: string) => void;
  onOpenPdf: (title: string, page: number) => void;
}

export const ImpactMatrixView: React.FC<ImpactMatrixViewProps> = ({
  requests,
  selectedRequestId,
  activeViolation,
  onSelectRequest,
  onSelectViolationCell,
  onApproveRequest,
  onRejectRequest,
  onOpenPdf,
}) => {
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<string>('All');
  const [isPanelDismissed, setIsPanelDismissed] = useState<boolean>(false);

  const selectedCr = requests.find((r) => r.id === selectedRequestId) || null;
  const violations = selectedCr
    ? REGULATIONS.filter((reg) => selectedCr.regulatoryImpacts?.[reg] === 'NO')
    : [];

  const showEvidencePanel = Boolean(selectedCr && violations.length > 0 && !isPanelDismissed);

  // Quick stats
  const totalConflicts = requests.reduce((acc, curr) => {
    const conflicts = REGULATIONS.filter((reg) => curr.regulatoryImpacts?.[reg] === 'NO').length;
    return acc + conflicts;
  }, 0);

  const totalChecks = requests.length * REGULATIONS.length;
  const clearChecks = totalChecks - totalConflicts;
  const complianceRate = Math.round((clearChecks / totalChecks) * 100);

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Overview Metric Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4.5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-medium">Cross-Border Compliance</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-0.5">{complianceRate}%</h3>
            <p className="text-[11px] text-emerald-600 font-medium mt-0.5">Across 5 global regimes</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4.5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-medium">Critical Conflict Hotspots</p>
            <h3 className="text-2xl font-bold text-red-600 mt-0.5">{totalConflicts}</h3>
            <p className="text-[11px] text-red-500 font-medium mt-0.5">Requiring analyst sign-off</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shrink-0">
            <AlertOctagon className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4.5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-medium">Monitored Regimes</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-0.5">5 Regimes</h3>
            <p className="text-[11px] text-blue-600 font-medium mt-0.5">EMIR, MiFID, Dodd-Frank, FCA, SEBI</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Globe className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Heatmap Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div
          className={`${
            showEvidencePanel ? 'lg:col-span-7 xl:col-span-8' : 'lg:col-span-12'
          } transition-all duration-300`}
        >
          <ImpactMatrix
            requests={requests}
            selectedRequestId={selectedRequestId}
            activeViolation={activeViolation}
            onSelectRequest={(req) => {
              onSelectRequest(req);
              setIsPanelDismissed(false);
            }}
            onSelectViolationCell={(req, reg) => {
              onSelectViolationCell(req, reg);
              setIsPanelDismissed(false);
            }}
          />
        </div>

        {/* Evidence & Recommendation Panel */}
        {showEvidencePanel && selectedCr && (
          <div className="lg:col-span-5 xl:col-span-4 sticky top-6">
            <EvidencePanel
              request={selectedCr}
              violations={violations}
              activeViolation={activeViolation || violations[0] || 'EMIR'}
              onSelectViolation={(reg) => onSelectViolationCell(selectedCr, reg)}
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
