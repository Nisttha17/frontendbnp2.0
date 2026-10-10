/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { ChangeRequestsView } from './components/ChangeRequestsView';
import { ImpactMatrixView } from './components/ImpactMatrixView';
import { HistoryView } from './components/HistoryView';
import { NewRequestModal } from './components/NewRequestModal';
import { RunAssessmentModal } from './components/RunAssessmentModal';
import { PdfViewerModal } from './components/PdfViewerModal';
import { NotificationsModal } from './components/NotificationsModal';
import {
  initialMetrics,
  initialChangeRequests,
  initialAssessments,
  mockNotifications,
  REGULATIONS,
} from './data/mockData';
import { ChangeRequest, MetricSummary, AssessmentItem, Regulation } from './types';
import { Menu, CheckCircle2 } from 'lucide-react';

export default function App() {
  // Navigation State: 'dashboard' | 'requests' | 'matrix' | 'history'
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);

  // Data States
  const [metrics, setMetrics] = useState<MetricSummary>(initialMetrics);
  const [requests, setRequests] = useState<ChangeRequest[]>(initialChangeRequests);
  const [assessments, setAssessments] = useState<AssessmentItem[]>(initialAssessments);
  const [notifications, setNotifications] = useState(mockNotifications);

  // Selection & Active Violation States
  const [selectedCrId, setSelectedCrId] = useState<string | null>(null);
  const [activeViolation, setActiveViolation] = useState<Regulation | null>(null);

  const [searchTerm, setSearchTerm] = useState<string>('');

  // Modals States
  const [isNewModalOpen, setIsNewModalOpen] = useState<boolean>(false);
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState<boolean>(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [pdfDocData, setPdfDocData] = useState<{ title: string; page: number }>({
    title: 'ESMA RTS 22 / EMIR Refit – Article 9.1',
    page: 24,
  });

  // Action Feedback Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Derive selected CR object
  const selectedCr = useMemo(() => {
    if (!selectedCrId) return null;
    return requests.find((r) => r.id === selectedCrId) || null;
  }, [requests, selectedCrId]);

  // Derive violations for selected CR (cells whose status is "NO")
  const violations = useMemo<Regulation[]>(() => {
    if (!selectedCr || !selectedCr.regulatoryImpacts) return [];
    return REGULATIONS.filter((reg) => selectedCr.regulatoryImpacts?.[reg] === 'NO');
  }, [selectedCr]);

  // Derive effective active violation regulation
  const effectiveActiveViolation: Regulation = useMemo(() => {
    if (activeViolation && violations.includes(activeViolation)) {
      return activeViolation;
    }
    return violations[0] || 'EMIR';
  }, [activeViolation, violations]);

  // Handler: Selecting a Change Request
  const handleSelectRequest = (request: ChangeRequest) => {
    setSelectedCrId(request.id);
    const reqViolations = REGULATIONS.filter(
      (reg) => request.regulatoryImpacts?.[reg] === 'NO'
    );
    setActiveViolation(reqViolations[0] || null);
  };

  const handleSelectRequestById = (crId: string) => {
    const found = requests.find((r) => r.id === crId);
    if (found) {
      handleSelectRequest(found);
    }
  };

  // Handler: Clicking a violation cell in matrix
  const handleSelectViolationCell = (request: ChangeRequest, regulation: Regulation) => {
    setSelectedCrId(request.id);
    setActiveViolation(regulation);
  };

  // Handler: Approve Request
  const handleApproveRequest = (reqId: string) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === reqId
          ? {
              ...r,
              status: 'Completed',
              recommendation: 'Analyst override recorded. Implementation proceeding.',
            }
          : r
      )
    );

    setAssessments((prev) => [
      {
        id: `ASM-${Math.floor(100 + Math.random() * 900)}`,
        dateTime: new Date().toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        requestId: reqId,
        status: 'Completed',
        summary: 'Analyst approved override with documented audit justification.',
      },
      ...prev,
    ]);

    setMetrics((prev) => ({
      ...prev,
      needsHumanReview: Math.max(0, prev.needsHumanReview - 1),
    }));

    showToast(`Change Request ${reqId} approved and logged in audit trail.`);
  };

  // Handler: Reject Request
  const handleRejectRequest = (reqId: string) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === reqId
          ? {
              ...r,
              status: 'Needs Review',
              recommendation: 'Returned to developer team to rectify timing mismatch.',
            }
          : r
      )
    );

    setAssessments((prev) => [
      {
        id: `ASM-${Math.floor(100 + Math.random() * 900)}`,
        dateTime: new Date().toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        requestId: reqId,
        status: 'Needs Review',
        summary: 'Returned for remediation: Timing/format non-compliant.',
      },
      ...prev,
    ]);

    showToast(`Change Request ${reqId} returned for remediation.`);
  };

  // Handler: Add New Request
  const handleAddRequest = (newReq: Partial<ChangeRequest>) => {
    const created: ChangeRequest = {
      id: newReq.id || `CR-${(requests.length + 1).toString().padStart(3, '0')}`,
      srNo: newReq.srNo || `CR-${(requests.length + 1).toString().padStart(3, '0')}`,
      description: newReq.description || 'New regulatory change request',
      status: (newReq.status as any) || 'Needs Review',
      date: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      author: 'N. Mishra',
      jurisdiction: newReq.jurisdiction || 'EU (ESMA)',
      regulatoryImpacts: newReq.regulatoryImpacts || {
        EMIR: 'YES',
        UKEMIR: 'NO',
        ASIC: 'YES',
        MAS: 'YES',
        HKMA: 'NO',
      },
      recommendation:
        newReq.recommendation ||
        'Automated intake scan flagged cross-regime discrepancies. Human review required.',
    };

    setRequests((prev) => [created, ...prev]);
    setSelectedCrId(created.id);
    setActiveTab('requests');

    setMetrics((prev) => ({
      ...prev,
      totalChangeRequests: prev.totalChangeRequests + 1,
      needsHumanReview: prev.needsHumanReview + 1,
    }));
    showToast(`New change request ${created.id} created and evaluated.`);
  };

  // Handler: Run Assessment Complete
  const handleAssessmentComplete = (reqId: string) => {
    setAssessments((prev) => [
      {
        id: `ASM-${Math.floor(200 + Math.random() * 800)}`,
        dateTime: new Date().toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        requestId: reqId,
        status: 'Needs Review',
        summary: 'Automated 5-regime scan completed. Heatmap violations mapped.',
      },
      ...prev,
    ]);

    setMetrics((prev) => ({
      ...prev,
      regulationsChecked: prev.regulationsChecked + 1,
    }));

    showToast(`Regulatory scan completed for ${reqId}. Heatmap updated.`);
  };

  // Open PDF Modal
  const handleOpenPdf = (title: string, page: number) => {
    setPdfDocData({ title, page });
    setIsPdfModalOpen(true);
  };

  const nextReqId = `CR-${(requests.length + 1).toString().padStart(3, '0')}`;
  const unreadCount = notifications.filter((n) => n.unread).length;

  // Header Title & Subtitle based on active page
  const headerInfo = useMemo(() => {
    switch (activeTab) {
      case 'requests':
        return {
          title: 'Change Requests Registry',
          subtitle: 'Track, review, and evaluate proposed changes across financial systems.',
        };
      case 'matrix':
        return {
          title: 'Regulatory Impact Matrix',
          subtitle: 'Multi-jurisdictional compliance parity and conflict mapping.',
        };
      case 'history':
        return {
          title: 'Regulatory Audit History',
          subtitle: 'Immutable audit ledger of change request assessments and sign-offs.',
        };
      default:
        return {
          title: 'Welcome back, Analyst!',
          subtitle: 'Track and analyse regulatory impact for proposed changes.',
        };
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#F0F4F9] text-slate-800 flex flex-col md:flex-row antialiased font-sans">
      {/* Mobile Header Bar */}
      <div className="md:hidden bg-[#0B1739] text-white px-4 py-3 flex items-center justify-between border-b border-[#15234E]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 text-blue-400">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-full h-full">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
          <span className="font-bold text-sm tracking-wider">IMPART</span>
        </div>
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-1.5 rounded-lg bg-blue-900/50 text-slate-200 cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Desktop Sidebar: full length matching page (self-stretch) */}
      <div className="hidden md:flex flex-col w-64 shrink-0 bg-[#0B1739] self-stretch min-h-screen border-r border-[#15234E]">
        <div className="sticky top-0 h-screen flex flex-col justify-between">
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
      </div>

      {/* Mobile Sidebar Drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-50 md:hidden transition-transform duration-300 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            setMobileSidebarOpen(false);
          }}
        />
      </div>

      {/* Backdrop for mobile drawer */}
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <div className="max-w-[1440px] w-full mx-auto p-4 sm:p-6 lg:p-7">
          {/* Main Top Header */}
          <Header
            title={headerInfo.title}
            subtitle={headerInfo.subtitle}
            onRunAssessment={() => setIsAssessmentModalOpen(true)}
            onOpenNotifications={() => setIsNotificationsOpen(true)}
            unreadCount={unreadCount}
          />

          {/* Dedicated Component Pages */}
          {activeTab === 'dashboard' && (
            <DashboardView
              metrics={metrics}
              onNavigateToRequests={() => setActiveTab('requests')}
              onSelectCrFromActivity={(crId) => {
                handleSelectRequestById(crId);
                setActiveTab('requests');
              }}
            />
          )}

          {activeTab === 'requests' && (
            <ChangeRequestsView
              requests={requests}
              selectedRequestId={selectedCrId}
              onSelectRequest={handleSelectRequest}
              onOpenNewModal={() => setIsNewModalOpen(true)}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              onApproveRequest={handleApproveRequest}
              onRejectRequest={handleRejectRequest}
              onOpenPdf={handleOpenPdf}
              activeViolation={activeViolation}
              setActiveViolation={setActiveViolation}
            />
          )}

          {activeTab === 'matrix' && (
            <ImpactMatrixView
              requests={requests}
              selectedRequestId={selectedCrId}
              activeViolation={effectiveActiveViolation}
              onSelectRequest={handleSelectRequest}
              onSelectViolationCell={handleSelectViolationCell}
              onApproveRequest={handleApproveRequest}
              onRejectRequest={handleRejectRequest}
              onOpenPdf={handleOpenPdf}
            />
          )}

          {activeTab === 'history' && (
            <HistoryView
              assessments={assessments}
              onBackToDashboard={() => setActiveTab('dashboard')}
              onSelectRequest={(reqId) => {
                handleSelectRequestById(reqId);
                setActiveTab('requests');
              }}
            />
          )}
        </div>
      </main>

      {/* Interactive Modals */}
      <NewRequestModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        onSubmit={handleAddRequest}
        nextId={nextReqId}
      />

      <RunAssessmentModal
        isOpen={isAssessmentModalOpen}
        onClose={() => setIsAssessmentModalOpen(false)}
        selectedRequest={selectedCr || requests[0]}
        onAssessmentComplete={handleAssessmentComplete}
      />

      <PdfViewerModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        docTitle={pdfDocData.title}
        pageNumber={pdfDocData.page}
      />

      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={() =>
          setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })))
        }
      />

      {/* Floating Action Feedback Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0B1739] text-white px-4 py-3 rounded-xl shadow-xl border border-blue-900/60 flex items-center gap-3 animate-slideUp text-xs font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
