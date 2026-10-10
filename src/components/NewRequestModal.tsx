import React, { useState } from 'react';
import { X, PlusCircle } from 'lucide-react';
import { ChangeRequest } from '../types';

interface NewRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newReq: ChangeRequest) => void;
  nextId: string;
}

export const NewRequestModal: React.FC<NewRequestModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  nextId,
}) => {
  const [description, setDescription] = useState('');
  const [sourceDoc, setSourceDoc] = useState('EMIR RTS 22 / MAS Notice 610');
  const [page, setPage] = useState('18');
  const [clause, setClause] = useState(
    '“Trading venues shall maintain records of order transmission parameters including participant timestamps.”'
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    const newRequest: ChangeRequest = {
      id: nextId,
      srNo: nextId,
      description: description.trim(),
      status: 'In Progress',
      date: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      fullDetails: description.trim(),
      sourceDoc,
      page: parseInt(page, 10) || 1,
      relevantClause: clause.trim(),
      impactExplanation: `Compliance evaluation initiated for proposed change in ${sourceDoc}. Jurisdictional impact mapped across EMIR, UKEMIR, ASIC, MAS, and HKMA.`,
      recommendation: 'Evaluate cross-border reporting mapping before implementation.',
      regulatoryImpacts: {
        EMIR: 'YES',
        UKEMIR: 'YES',
        ASIC: 'NO',
        MAS: 'YES',
        HKMA: 'NO',
      },
    };

    onSubmit(newRequest);
    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-100 max-w-lg w-full overflow-hidden animate-fadeIn">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
              <PlusCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0c1538]">New Change Request</h3>
              <p className="text-xs text-slate-500">Initiate automated regulatory impact scan</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Request ID
            </label>
            <input
              type="text"
              value={nextId}
              disabled
              className="w-full bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-600 font-mono font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Change Description <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., Update LEI checksum validation format to ISO 17442 across post-trade feeds..."
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Governing Regulation / Standard
              </label>
              <input
                type="text"
                value={sourceDoc}
                onChange={(e) => setSourceDoc(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-hidden focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Source Page
              </label>
              <input
                type="number"
                value={page}
                onChange={(e) => setPage(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-hidden focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Relevant Clause Excerpt
            </label>
            <textarea
              rows={2}
              value={clause}
              onChange={(e) => setClause(e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-hidden focus:border-blue-500"
            />
          </div>

          {/* Modal Actions */}
          <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold bg-[#0b1b4f] hover:bg-[#14296c] text-white rounded-lg transition-colors shadow-xs cursor-pointer"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
