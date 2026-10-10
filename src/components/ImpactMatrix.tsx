import React from 'react';
import { ChangeRequest, Regulation } from '../types';
import { REGULATIONS } from '../data/mockData';
import { CheckCircle2 } from 'lucide-react';

interface ImpactMatrixProps {
  requests: ChangeRequest[];
  selectedRequestId: string | null;
  activeViolation: Regulation | null;
  onSelectRequest: (request: ChangeRequest) => void;
  onSelectViolationCell: (request: ChangeRequest, regulation: Regulation) => void;
}

export const ImpactMatrix: React.FC<ImpactMatrixProps> = ({
  requests,
  selectedRequestId,
  activeViolation,
  onSelectRequest,
  onSelectViolationCell,
}) => {
  // Find selected request
  const selectedCr = requests.find((r) => r.id === selectedRequestId) || null;

  // Determine if selected request has zero violations (all YES)
  const selectedCrViolations = selectedCr
    ? REGULATIONS.filter((reg) => selectedCr.regulatoryImpacts?.[reg] === 'NO')
    : [];
  const hasNoViolations = selectedCr !== null && selectedCrViolations.length === 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 mb-6">
      {/* Header & Legend */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        {/* Left: Interconnected Molecular / Network Icon + Title */}
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 text-blue-600 shrink-0">
            <svg viewBox="0 0 42 42" fill="none" className="w-full h-full">
              {/* Interconnected network nodes */}
              <circle cx="21" cy="14" r="5" fill="#2563eb" />
              <circle cx="10" cy="29" r="4.5" fill="#3b82f6" />
              <circle cx="34" cy="26" r="4.5" fill="#1d4ed8" />
              <circle cx="8" cy="12" r="3" fill="#60a5fa" />
              <line x1="21" y1="14" x2="10" y2="29" stroke="#3b82f6" strokeWidth="2.2" />
              <line x1="21" y1="14" x2="34" y2="26" stroke="#2563eb" strokeWidth="2.2" />
              <line x1="21" y1="14" x2="8" y2="12" stroke="#60a5fa" strokeWidth="2" />
              <line x1="10" y1="29" x2="34" y2="26" stroke="#93c5fd" strokeWidth="1.5" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0c1b48] tracking-tight">
              IMPART – Regulatory Impact Heatmap
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
              Track which Change Requests (CRs) impact which regulations, with clear evidence and source references.
            </p>
          </div>
        </div>

        {/* Right: Legend */}
        <div className="flex items-center gap-4 bg-white border border-slate-200 rounded-xl px-4 py-2 self-start md:self-auto shadow-2xs">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-xs bg-[#d1fae5] border border-[#10b981] inline-block shrink-0" />
            <span className="text-xs font-semibold text-slate-800">YES = Impact</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-xs bg-[#fee2e2] border border-[#f87171] inline-block shrink-0" />
            <span className="text-xs font-semibold text-slate-800">NO = No impact</span>
          </div>
        </div>
      </div>

      {/* Heatmap Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-2.5 border-spacing-x-2">
          <thead>
            <tr className="text-xs sm:text-sm font-bold text-[#0c1538]">
              <th className="py-2.5 px-3 w-64 md:w-80">Change Request (CR)</th>
              <th className="py-2.5 px-2 text-center w-28">EMIR</th>
              <th className="py-2.5 px-2 text-center w-28">UKEMIR</th>
              <th className="py-2.5 px-2 text-center w-28">ASIC</th>
              <th className="py-2.5 px-2 text-center w-28">MAS</th>
              <th className="py-2.5 px-2 text-center w-28">HKMA</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => {
              const isSelected = selectedRequestId !== null && req.id === selectedRequestId;

              return (
                <tr
                  key={req.id}
                  onClick={() => onSelectRequest(req)}
                  className={`cursor-pointer transition-all ${
                    isSelected ? 'bg-blue-50/50 rounded-xl' : 'hover:bg-slate-50/60'
                  }`}
                >
                  {/* CR Column: ID and Description */}
                  <td className="py-2.5 px-3">
                    <p className="font-bold text-sm text-[#0c1538] flex items-center gap-2">
                      {isSelected && (
                        <span className="w-1.5 h-3.5 bg-blue-600 rounded-full inline-block" />
                      )}
                      <span>{req.srNo}</span>
                    </p>
                    <p className="text-xs text-slate-500 font-normal mt-0.5 line-clamp-1">
                      {req.description}
                    </p>
                  </td>

                  {/* Regulation YES / NO Cells */}
                  {REGULATIONS.map((reg) => {
                    const impact = req.regulatoryImpacts?.[reg] || 'NO';
                    const isYes = impact === 'YES';
                    const isCellActiveViolation =
                      isSelected && !isYes && activeViolation === reg;

                    return (
                      <td key={reg} className="p-0.5 text-center">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!isYes) {
                              // Clicking a red (NO) cell selects this CR and switches active violation
                              onSelectViolationCell(req, reg);
                            }
                            // Clicking green (YES) cell does not open panel as per Requirement 8
                          }}
                          className={`w-full py-2.5 sm:py-3 px-2 rounded-xl font-bold text-xs tracking-wider transition-all cursor-pointer text-center block ${
                            isYes
                              ? 'bg-[#d1fae5] text-[#065f46] border border-emerald-200/60 hover:bg-[#c2f3d9]'
                              : isCellActiveViolation
                              ? 'bg-[#fee2e2] text-[#991b1b] border-2 border-red-500 ring-2 ring-red-400/50 shadow-sm scale-[1.03]'
                              : 'bg-[#fee2e2] text-[#991b1b] border border-red-200/60 hover:border-red-400 hover:scale-[1.02]'
                          }`}
                          title={
                            isYes
                              ? `${reg}: Compliant (No violation)`
                              : `${reg}: Violation (Click to inspect evidence)`
                          }
                        >
                          {impact}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Message when selected CR has all YES (0 violations) */}
      {hasNoViolations && (
        <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-800 flex items-center gap-2.5 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>No violations found for {selectedCr?.srNo}</span>
        </div>
      )}

      {/* Footer Note matching reference image */}
      <p className="text-xs italic text-slate-400 mt-4 font-normal">
        Illustrative sample data — not actual regulatory conclusions.
      </p>
    </div>
  );
};
