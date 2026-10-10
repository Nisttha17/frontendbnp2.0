import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { ChangeRequest } from '../types';

interface RunAssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRequest: ChangeRequest;
  onAssessmentComplete: (reqId: string) => void;
}

export const RunAssessmentModal: React.FC<RunAssessmentModalProps> = ({
  isOpen,
  onClose,
  selectedRequest,
  onAssessmentComplete,
}) => {
  const [stage, setStage] = useState<'running' | 'completed'>('running');
  const [progress, setProgress] = useState(15);
  const [currentJurisdiction, setCurrentJurisdiction] = useState('MiFID II (EU)');

  useEffect(() => {
    if (!isOpen) {
      setStage('running');
      setProgress(15);
      return;
    }

    const timer1 = setTimeout(() => {
      setProgress(45);
      setCurrentJurisdiction('Dodd-Frank (US CFTC/SEC)');
    }, 600);

    const timer2 = setTimeout(() => {
      setProgress(75);
      setCurrentJurisdiction('UK FCA & MAS Singapore Rules');
    }, 1200);

    const timer3 = setTimeout(() => {
      setProgress(100);
      setStage('completed');
    }, 1800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-100 max-w-md w-full overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-900 text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-blue-300" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0c1538]">
                Regulatory Impact Assessment
              </h3>
              <p className="text-[11px] text-slate-500">
                Running automated cross-jurisdiction parity analysis
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-4">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Target Request
            </span>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 mt-1">
              <span className="font-bold text-xs text-[#0c1538] mr-2">
                {selectedRequest.srNo}
              </span>
              <span className="text-xs text-slate-600 line-clamp-1">
                {selectedRequest.description}
              </span>
            </div>
          </div>

          {stage === 'running' ? (
            <div className="py-4 text-center">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-3" />
              <p className="text-xs font-semibold text-slate-800">
                Evaluating against {currentJurisdiction}...
              </p>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-3">
                <div
                  className="bg-blue-600 h-full transition-all duration-500 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-2 font-mono">
                {progress}% complete
              </p>
            </div>
          ) : (
            <div className="py-2 text-center">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">Assessment Complete</h4>
              <p className="text-xs text-slate-600 mt-1">
                6 jurisdictions evaluated. 12 regulations verified. Matrix entries updated with fresh compliance indicators.
              </p>

              <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-left text-xs text-emerald-800">
                <p className="font-semibold">AI Recommendation:</p>
                <p className="mt-0.5 text-[11px] text-emerald-700">
                  Ready for analyst review. High parity maintained across EMIR, SFTR, and MAS directives.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-100 bg-slate-50 flex justify-end gap-2">
          {stage === 'completed' ? (
            <button
              onClick={() => {
                onAssessmentComplete(selectedRequest.id);
                onClose();
              }}
              className="px-4 py-2 bg-[#0b1b4f] hover:bg-[#14296c] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Apply Assessment to Dashboard
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-4 py-1.5 text-xs text-slate-600 hover:bg-slate-200 rounded transition-colors cursor-pointer"
            >
              Run in Background
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
