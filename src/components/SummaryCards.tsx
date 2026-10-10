import React from 'react';
import { FileText, AlertTriangle, Clock, CheckCircle2 } from 'lucide-react';
import { MetricSummary } from '../types';

interface SummaryCardsProps {
  metrics: MetricSummary;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* 1. Total Change Requests */}
      <div className="bg-white rounded-xl p-4.5 border border-slate-200/80 shadow-xs flex items-center justify-between hover:shadow-sm transition-shadow">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-600 font-medium">Total Change Requests</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-0.5 tracking-tight">
              {metrics.totalChangeRequests.toString().padStart(2, '0')}
            </h3>
            <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
              <span>+2 this week</span>
            </p>
          </div>
        </div>

        {/* Blue Sparkline */}
        <div className="w-20 h-10 shrink-0">
          <svg viewBox="0 0 80 36" fill="none" className="w-full h-full">
            <path
              d="M2,26 C16,28 26,18 38,24 C50,30 62,12 78,8"
              stroke="#3b82f6"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* 2. Conflicts Detected */}
      <div className="bg-white rounded-xl p-4.5 border border-slate-200/80 shadow-xs flex items-center justify-between hover:shadow-sm transition-shadow">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-600 font-medium">Conflicts Detected</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-0.5 tracking-tight">
              {metrics.conflictsDetected.toString().padStart(2, '0')}
            </h3>
            <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
              <span>+1 this week</span>
            </p>
          </div>
        </div>

        {/* Red Sparkline */}
        <div className="w-20 h-10 shrink-0">
          <svg viewBox="0 0 80 36" fill="none" className="w-full h-full">
            <path
              d="M2,28 C14,32 26,18 40,26 C52,32 64,14 78,12"
              stroke="#ef4444"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* 3. Needs Human Review */}
      <div className="bg-white rounded-xl p-4.5 border border-slate-200/80 shadow-xs flex items-center justify-between hover:shadow-sm transition-shadow">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-600 font-medium">Needs Human Review</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-0.5 tracking-tight">
              {metrics.needsHumanReview.toString().padStart(2, '0')}
            </h3>
            <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
              <span>-1 this week</span>
            </p>
          </div>
        </div>

        {/* Amber Sparkline */}
        <div className="w-20 h-10 shrink-0">
          <svg viewBox="0 0 80 36" fill="none" className="w-full h-full">
            <path
              d="M2,30 C16,28 28,18 42,26 C54,30 66,12 78,10"
              stroke="#f59e0b"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* 4. Regulations Checked */}
      <div className="bg-white rounded-xl p-4.5 border border-slate-200/80 shadow-xs flex items-center justify-between hover:shadow-sm transition-shadow">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-600 font-medium">Regulations Checked</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-0.5 tracking-tight">
              {metrics.regulationsChecked.toString().padStart(2, '0')}
            </h3>
            <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
              <span>+3 this week</span>
            </p>
          </div>
        </div>

        {/* Green Sparkline */}
        <div className="w-20 h-10 shrink-0">
          <svg viewBox="0 0 80 36" fill="none" className="w-full h-full">
            <path
              d="M2,28 C16,30 28,16 44,22 C56,26 68,10 78,6"
              stroke="#10b981"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
