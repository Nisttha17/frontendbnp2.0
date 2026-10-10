import React from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { AssessmentItem } from '../types';

interface RecentAssessmentsProps {
  assessments: AssessmentItem[];
  onSelectRequestId: (reqId: string) => void;
  onViewAll?: () => void;
}

export const RecentAssessments: React.FC<RecentAssessmentsProps> = ({
  assessments,
  onSelectRequestId,
  onViewAll,
}) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return (
          <span className="bg-emerald-100 text-emerald-700 font-medium px-2.5 py-0.5 rounded-full text-xs inline-block">
            Completed
          </span>
        );
      case 'In Progress':
        return (
          <span className="bg-blue-100 text-blue-700 font-medium px-2.5 py-0.5 rounded-full text-xs inline-block">
            In Progress
          </span>
        );
      case 'Needs Review':
        return (
          <span className="bg-amber-100 text-amber-700 font-medium px-2.5 py-0.5 rounded-full text-xs inline-block">
            Needs Review
          </span>
        );
      case 'Pending':
        return (
          <span className="bg-slate-100 text-slate-600 font-medium px-2.5 py-0.5 rounded-full text-xs inline-block">
            Pending
          </span>
        );
      default:
        return (
          <span className="bg-slate-100 text-slate-600 font-medium px-2.5 py-0.5 rounded-full text-xs inline-block">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-xs overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-5 flex items-center justify-between border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#0c1538]">Recent Assessments</h2>
            <p className="text-xs text-slate-500">View the latest analysis results.</p>
          </div>
        </div>

        <button
          onClick={onViewAll}
          className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-slate-700 font-semibold">
              <th className="py-3 px-5 w-44">Date & Time</th>
              <th className="py-3 px-4 w-28">Request ID</th>
              <th className="py-3 px-4 w-32">Status</th>
              <th className="py-3 px-5">Summary</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {assessments.slice(0, 3).map((item) => (
              <tr
                key={item.id}
                onClick={() => onSelectRequestId(item.requestId)}
                className="hover:bg-slate-50/70 cursor-pointer transition-colors"
              >
                <td className="py-3.5 px-5 text-slate-700 font-normal">{item.dateTime}</td>
                <td className="py-3.5 px-4 font-semibold text-[#0c1538] hover:text-blue-600 underline-offset-2 hover:underline">
                  {item.requestId}
                </td>
                <td className="py-3.5 px-4">{getStatusBadge(item.status)}</td>
                <td className="py-3.5 px-5 text-slate-700 font-normal">{item.summary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
