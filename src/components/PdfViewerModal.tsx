import React from 'react';
import { X, Download, ZoomIn, ZoomOut, FileText, CheckCircle } from 'lucide-react';

interface PdfViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  docTitle: string;
  pageNumber: number;
}

export const PdfViewerModal: React.FC<PdfViewerModalProps> = ({
  isOpen,
  onClose,
  docTitle,
  pageNumber,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-3xl w-full flex flex-col h-[82vh] overflow-hidden">
        {/* Top PDF Bar */}
        <div className="px-5 py-3.5 bg-[#0b122e] text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded bg-red-600 flex items-center justify-center text-[10px] font-bold">
              PDF
            </div>
            <div>
              <p className="text-xs font-semibold">{docTitle}</p>
              <p className="text-[10px] text-slate-400">Official Regulatory Directive · Page {pageNumber} of 148</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-slate-800 rounded px-2 py-1 text-slate-300 text-xs">
              <ZoomOut className="w-3.5 h-3.5 cursor-pointer hover:text-white" />
              <span className="text-[11px] px-1 font-mono">100%</span>
              <ZoomIn className="w-3.5 h-3.5 cursor-pointer hover:text-white" />
            </div>

            <button
              onClick={() => alert('Document downloaded for compliance record.')}
              className="p-1.5 hover:bg-slate-800 text-slate-300 hover:text-white rounded transition-colors cursor-pointer"
              title="Download PDF"
            >
              <Download className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded transition-colors cursor-pointer"
              title="Close PDF"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Document Content Simulation */}
        <div className="flex-1 bg-slate-100 p-6 overflow-y-auto flex justify-center">
          <div className="bg-white shadow-md border border-slate-200 max-w-2xl w-full p-8 text-slate-800 font-serif leading-relaxed text-xs">
            {/* Header info on document page */}
            <div className="flex justify-between items-center border-b border-slate-300 pb-3 mb-6 text-[10px] text-slate-500 font-sans uppercase tracking-widest">
              <span>European Securities and Markets Authority</span>
              <span>Official Journal · Section III</span>
            </div>

            <h1 className="text-base font-bold text-slate-900 font-sans mb-3">
              Article 12: Synchronization and Clock Traceability Standards
            </h1>

            <p className="mb-4 text-justify">
              1. Trading venues and systematic internalisers shall establish, implement, and maintain effective arrangements to continuously synchronize business clocks with Coordinated Universal Time (UTC) disseminated by official timing centers.
            </p>

            <p className="mb-4 text-justify">
              2. For orders submitted electronically, timestamp granularity shall not exceed one microsecond for high-frequency algorithmic techniques, and one millisecond for other transaction processing pipelines.
            </p>

            {/* Highlighted Target Clause */}
            <div className="my-5 p-3.5 bg-amber-50 border-l-4 border-amber-500 text-slate-900 rounded-r text-xs font-sans">
              <div className="flex items-center gap-1.5 text-amber-800 font-semibold mb-1 text-[11px]">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Audited Clause under Inspection (Article 12.3)</span>
              </div>
              <p className="italic font-serif leading-normal bg-amber-100/60 p-2 rounded">
                “The trading venue shall ensure accurate record-keeping and timestamp of each trade lifecycle event, including quote submission, order modification, routing acknowledgement, and trade execution.”
              </p>
            </div>

            <p className="mb-4 text-justify">
              4. Competent authorities shall have continuous audit access to verify clock offset drift logs. Records must be retained for a minimum period of five years following transaction execution.
            </p>

            <div className="mt-12 pt-4 border-t border-slate-200 flex justify-between text-[10px] text-slate-400 font-sans">
              <span>Doc ID: ESMA-RTS-2026/0449</span>
              <span>Page {pageNumber}</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="px-5 py-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <span className="flex items-center gap-2">
            <FileText className="w-3.5 h-3.5 text-blue-600" />
            <span>Verified against ESMA Regulatory Rulebook 2026</span>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 font-medium rounded text-slate-800 transition-colors cursor-pointer"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
