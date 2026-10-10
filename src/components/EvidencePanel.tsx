import React from 'react';
import {
  FileText,
  X,
  ExternalLink,
  AlertTriangle,
  FileCode,
} from 'lucide-react';
import { ChangeRequest } from '../types';

export type Regulation = 'EMIR' | 'UKEMIR' | 'ASIC' | 'MAS' | 'HKMA';

export interface ViolationEvidence {
  regulation: Regulation;
  document: string;
  clause: string;
  page: number;
  quote: string;
  impact: string;
}

const REGULATION_EVIDENCE_MAP: Record<Regulation, {
  document: string;
  clause: string;
  page: number;
  quote: string;
  impact: string;
}> = {
  EMIR: {
    document: 'ESMA RTS 22 / EMIR Refit – Article 9.1',
    clause: '“Mandatory Reporting & Field Format Alignment”',
    page: 24,
    quote: '“Counterparties and CCPs shall ensure that the details of any derivative contract are reported without duplication, conforming strictly to the prescribed technical XML schema format.”',
    impact: 'Proposed change alters mandatory reporting fields, creating schema validation failures and reconciliation mismatches in EMIR trade repositories.',
  },
  UKEMIR: {
    document: 'Bank of England & FCA Policy Statement PS23/2',
    clause: '“Annex B – Trade State & Clock Traceability”',
    page: 18,
    quote: '“Reporting entities must adhere to Bank of England validation rules and clock synchronization tolerances. Non-conforming payloads shall be rejected at the gateway.”',
    impact: 'Fails UK EMIR post-Brexit bilateral reconciliation rules. Downstream UK trade repository gateways will reject modified messages.',
  },
  ASIC: {
    document: 'ASIC Derivative Transaction Rules (Reporting) 2024',
    clause: '“Rule 2.2.8 – Record Keeping & Unique Identifiers”',
    page: 41,
    quote: '“Reporting entities shall maintain synchronous timestamps and adhere to designated UTI/UPI character length limits without unauthorized custom field truncations.”',
    impact: 'Conflicts with ASIC transaction reporting standards. Field structure changes breach character length and validation guidelines.',
  },
  MAS: {
    document: 'MAS Notice 610 / Securities & Futures Regulations',
    clause: '“Regulation 7 – Derivative Contracts Verification”',
    page: 32,
    quote: '“Specified persons shall submit verified counterparty LEI and execution timestamp data within prescribed T+1 reporting deadlines with exact jurisdictional classification.”',
    impact: 'Violates MAS reporting accuracy thresholds and field taxonomy rules. Counterparty mapping is non-compliant.',
  },
  HKMA: {
    document: 'HKMA Supplementary Guidance on OTC Derivatives Reporting',
    clause: '“Section 3.4 – Mandatory Clearing & Intermediary Mapping”',
    page: 55,
    quote: '“Reporting entities must ensure full consistency in trade party classification according to HKMA trade repository validation filters.”',
    impact: 'Non-compliant with HKMA TR format validation filters and trade categorization rules for this change request.',
  },
};

export function getViolationEvidence(cr: ChangeRequest, reg: Regulation): ViolationEvidence {
  const base = REGULATION_EVIDENCE_MAP[reg] || REGULATION_EVIDENCE_MAP.EMIR;
  return {
    regulation: reg,
    document: base.document,
    clause: base.clause,
    page: base.page,
    quote: base.quote,
    impact: `${base.impact} (Target: ${cr.srNo} - ${cr.description})`,
  };
}

interface EvidencePanelProps {
  request: ChangeRequest;
  violations: Regulation[];
  activeViolation: Regulation;
  onSelectViolation?: (reg: Regulation) => void;
  onApprove: (requestId: string) => void;
  onReject: (requestId: string) => void;
  onOpenPdf: (docName: string, page: number) => void;
  onClose?: () => void;
}

export const EvidencePanel: React.FC<EvidencePanelProps> = ({
  request,
  violations,
  activeViolation,
  onSelectViolation,
  onApprove,
  onReject,
  onOpenPdf,
  onClose,
}) => {
  const isApproved = request.status === 'Completed';
  const isRejected = request.status === 'Needs Review' || request.status === 'Rejected';

  // Retrieve structured evidence for the active violated regulation
  const evidence = getViolationEvidence(request, activeViolation);

  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-xs p-5 flex flex-col justify-between h-full animate-fadeIn">
      {/* Top Header */}
      <div>
        <div className="pb-3 border-b border-slate-100 mb-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <FileText className="w-3.5 h-3.5" />
              </div>
              <h2 className="text-sm sm:text-base font-bold text-[#0c1538]">
                Evidence & Recommendations
              </h2>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-md hover:bg-slate-50 cursor-pointer"
                title="Close panel"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Violated Regulations Selector Tabs */}
          {violations.length > 0 && (
            <div className="flex items-center gap-1.5 mt-2.5 flex-wrap">
              <span className="text-[11px] font-semibold text-slate-500">
                Active Violation:
              </span>
              {violations.map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => onSelectViolation && onSelectViolation(v)}
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-md cursor-pointer transition-colors ${
                    v === activeViolation
                      ? 'bg-red-600 text-white shadow-2xs'
                      : 'bg-red-100 text-red-700 hover:bg-red-200'
                  }`}
                  title={`View ${v} violation evidence`}
                >
                  {v}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Source Document Card */}
        <div className="bg-slate-50/70 border border-slate-100 rounded-lg p-3 flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {/* Red PDF Icon badge */}
            <div className="w-7 h-8 bg-red-500 rounded-xs flex flex-col items-center justify-center text-white shrink-0 shadow-2xs">
              <FileCode className="w-3.5 h-3.5" />
              <span className="text-[7px] font-extrabold uppercase tracking-wider -mt-0.5">pdf</span>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-medium">Source Document</p>
              <p className="text-xs font-bold text-slate-900 leading-tight">
                {evidence.document}
              </p>
              <button
                onClick={() => onOpenPdf(evidence.document, evidence.page)}
                className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 mt-0.5 cursor-pointer hover:underline"
              >
                <span>View PDF</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="text-right">
            <p className="text-[10px] text-slate-500">Page</p>
            <p className="text-xs font-bold text-slate-800">{evidence.page}</p>
          </div>
        </div>

        {/* Relevant Clause */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <h3 className="text-xs font-bold text-slate-800 tracking-tight">
              Relevant Clause
            </h3>
            <span className="text-[10px] font-semibold text-slate-500">
              {evidence.clause}
            </span>
          </div>
          <div className="bg-blue-50/60 border border-blue-100/70 rounded-lg p-3 text-xs text-slate-700 italic leading-relaxed">
            {evidence.quote}
          </div>
        </div>

        {/* Impact Explanation */}
        <div className="mb-4">
          <h3 className="text-xs font-bold text-slate-800 mb-1.5 tracking-tight">
            Impact Explanation
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed font-normal">
            {evidence.impact}
          </p>
        </div>

        {/* Recommendation Box - Red Style: Do Not Proceed & List of Violations */}
        <div className="bg-red-50/90 border border-red-200 rounded-lg p-3 flex items-start gap-2.5 mb-5">
          <div className="text-red-600 shrink-0 mt-0.5">
            <AlertTriangle className="w-4 h-4 fill-red-100" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-red-800">Recommendation</h4>
            <p className="text-xs font-bold text-red-700 mt-0.5">
              Do Not Proceed
            </p>
            <p className="text-xs text-red-600 font-medium mt-0.5">
              Violates: {violations.join(', ')}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-2">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onApprove(request.id)}
            disabled={isApproved}
            className={`flex-1 py-2 px-4 rounded-lg text-xs font-semibold transition-all cursor-pointer shadow-xs active:scale-[0.98] text-center ${
              isApproved
                ? 'bg-emerald-700 text-white cursor-default'
                : 'border border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {isApproved ? '✓ Approved' : 'Override & Approve'}
          </button>
          <button
            onClick={() => onReject(request.id)}
            disabled={isRejected}
            className={`flex-1 py-2 px-4 rounded-lg text-xs font-semibold transition-all cursor-pointer active:scale-[0.98] text-center ${
              isRejected
                ? 'bg-red-100 text-red-800 border border-red-300 cursor-default'
                : 'bg-red-600 hover:bg-red-700 text-white shadow-xs'
            }`}
          >
            {isRejected ? 'Marked: Do Not Proceed' : 'Do Not Proceed'}
          </button>
        </div>
      </div>
    </div>
  );
};
