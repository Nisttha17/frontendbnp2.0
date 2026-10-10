import React from 'react';
import { SummaryCards } from './SummaryCards';
import { MetricSummary } from '../types';
import { AlertTriangle, Clock, CheckCircle2, Plus } from 'lucide-react';

interface DashboardViewProps {
  metrics: MetricSummary;
  onNavigateToRequests?: () => void;
  onSelectCrFromActivity?: (crId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  metrics,
  onNavigateToRequests,
  onSelectCrFromActivity,
}) => {
  // Jurisdiction data matching img1 UI
  const jurisdictions = [
    {
      code: 'EU',
      name: 'EU (ESMA)',
      conflicts: 3,
      statusText: '3 conflicts',
      hasConflicts: true,
      // Bar segment percentages (sum = 100)
      segments: { conflict: 30, review: 10, clear: 60 },
    },
    {
      code: 'UK',
      name: 'UK (FCA)',
      conflicts: 2,
      statusText: '2 conflicts',
      hasConflicts: true,
      segments: { conflict: 22, review: 12, clear: 66 },
    },
    {
      code: 'US',
      name: 'US (SEC)',
      conflicts: 0,
      statusText: 'No conflicts',
      hasConflicts: false,
      segments: { conflict: 0, review: 0, clear: 100 },
    },
    {
      code: 'SG',
      name: 'Singapore (MAS)',
      conflicts: 0,
      statusText: 'No conflicts',
      hasConflicts: false,
      segments: { conflict: 0, review: 0, clear: 100 },
    },
    {
      code: 'IN',
      name: 'India (SEBI)',
      conflicts: 3,
      statusText: '3 conflicts',
      hasConflicts: true,
      segments: { conflict: 30, review: 10, clear: 60 },
    },
  ];

  // Recent activity items matching img1 UI
  const activities = [
    {
      id: 'act-1',
      crId: 'CR-002',
      type: 'conflict',
      title: 'Conflict detected for CR-002 in EU (ESMA)',
      time: '2h ago',
      icon: AlertTriangle,
      iconBg: 'bg-red-50 text-red-500',
    },
    {
      id: 'act-2',
      crId: 'CR-004',
      type: 'review',
      title: 'CR-004 sent for human review',
      time: '5h ago',
      icon: Clock,
      iconBg: 'bg-amber-50 text-amber-500',
    },
    {
      id: 'act-3',
      crId: 'CR-003',
      type: 'completed',
      title: 'CR-003 assessment completed',
      time: 'Yesterday',
      icon: CheckCircle2,
      iconBg: 'bg-emerald-50 text-emerald-600',
    },
    {
      id: 'act-4',
      crId: 'CR-005',
      type: 'added',
      title: 'CR-005 added: new field for regulatory reporting',
      time: 'Yesterday',
      icon: Plus,
      iconBg: 'bg-blue-50 text-blue-600',
    },
    {
      id: 'act-5',
      crId: 'CR-001',
      type: 'conflict',
      title: 'Conflict detected for CR-001 in India (SEBI)',
      time: '2 days ago',
      icon: AlertTriangle,
      iconBg: 'bg-red-50 text-red-500',
    },
  ];

  // Circular donut metrics
  // Circumference for r=58: 2 * Math.PI * 58 ≈ 364.42
  const circumference = 364.4;
  // Clear: 73% (266)
  const clearLength = circumference * 0.73;
  // Review: 10% (36.4)
  const reviewLength = circumference * 0.10;
  // Conflict: 17% (62)
  const conflictLength = circumference * 0.17;

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* 1. KPI Summary Cards */}
      <SummaryCards metrics={metrics} />

      {/* 2. Middle Row: Overall Compliance & Jurisdiction Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Card: Overall Compliance */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Overall compliance
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Share of assessed items by outcome, across all jurisdictions
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-around gap-6 my-6">
            {/* Donut Chart SVG */}
            <div className="relative w-44 h-44 flex items-center justify-center shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 140 140">
                {/* Background Track */}
                <circle
                  cx="70"
                  cy="70"
                  r="54"
                  fill="none"
                  stroke="#F1F5F9"
                  strokeWidth="14"
                />

                {/* Clear Segment (Green) - 73% */}
                <circle
                  cx="70"
                  cy="70"
                  r="54"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="14"
                  strokeDasharray={`${clearLength} ${circumference}`}
                  strokeDashoffset="0"
                  strokeLinecap="round"
                />

                {/* Needs Review Segment (Amber) - 10% */}
                <circle
                  cx="70"
                  cy="70"
                  r="54"
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="14"
                  strokeDasharray={`${reviewLength} ${circumference}`}
                  strokeDashoffset={`${-clearLength}`}
                />

                {/* Conflict Segment (Red) - 17% */}
                <circle
                  cx="70"
                  cy="70"
                  r="54"
                  fill="none"
                  stroke="#EF4444"
                  strokeWidth="14"
                  strokeDasharray={`${conflictLength} ${circumference}`}
                  strokeDashoffset={`${-(clearLength + reviewLength)}`}
                  strokeLinecap="round"
                />
              </svg>

              {/* Inner Center Label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  73%
                </span>
                <span className="text-xs text-slate-500 font-medium -mt-0.5">
                  Compliant
                </span>
              </div>
            </div>

            {/* Legend Breakdown */}
            <div className="space-y-3.5 min-w-[160px]">
              <div className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                  <span className="text-xs text-slate-600 font-medium">Clear</span>
                </div>
                <span className="text-xs font-bold text-slate-900">35</span>
              </div>

              <div className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                  <span className="text-xs text-slate-600 font-medium">Needs review</span>
                </div>
                <span className="text-xs font-bold text-slate-900">5</span>
              </div>

              <div className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0" />
                  <span className="text-xs text-slate-600 font-medium">Conflict</span>
                </div>
                <span className="text-xs font-bold text-slate-900">8</span>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <p className="text-xs text-slate-400 font-normal">
                  48 items assessed
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Card: Jurisdiction Summary */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Jurisdiction summary
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Outcome split for each jurisdiction
            </p>
          </div>

          {/* List of 5 Jurisdictions */}
          <div className="space-y-4 my-3">
            {jurisdictions.map((j) => (
              <div key={j.code} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-bold rounded">
                      {j.code}
                    </span>
                    <span className="text-xs font-medium text-slate-800">
                      {j.name}
                    </span>
                  </div>
                  <span
                    className={`text-xs font-medium ${
                      j.hasConflicts ? 'text-red-500 font-semibold' : 'text-slate-500'
                    }`}
                  >
                    {j.statusText}
                  </span>
                </div>

                {/* Segmented Horizontal Progress Bar */}
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden flex">
                  {j.segments.conflict > 0 && (
                    <div
                      style={{ width: `${j.segments.conflict}%` }}
                      className="bg-red-500 h-full transition-all duration-300"
                      title={`${j.segments.conflict}% Conflicts`}
                    />
                  )}
                  {j.segments.review > 0 && (
                    <div
                      style={{ width: `${j.segments.review}%` }}
                      className="bg-amber-500 h-full transition-all duration-300"
                      title={`${j.segments.review}% Needs review`}
                    />
                  )}
                  {j.segments.clear > 0 && (
                    <div
                      style={{ width: `${j.segments.clear}%` }}
                      className="bg-emerald-500 h-full transition-all duration-300"
                      title={`${j.segments.clear}% Clear`}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Bottom Row: Recent Activity matching img1 UI */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-6">
        <div className="mb-4">
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            Recent activity
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Latest assessment events
          </p>
        </div>

        <div className="divide-y divide-slate-100">
          {activities.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => {
                  if (onSelectCrFromActivity) {
                    onSelectCrFromActivity(item.crId);
                  } else if (onNavigateToRequests) {
                    onNavigateToRequests();
                  }
                }}
                className="py-3.5 flex items-center justify-between gap-4 hover:bg-slate-50/70 -mx-3 px-3 rounded-lg transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${item.iconBg}`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-medium text-slate-800 group-hover:text-blue-700 transition-colors truncate">
                    {item.title}
                  </span>
                </div>
                <span className="text-xs text-slate-400 font-normal shrink-0">
                  {item.time}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
