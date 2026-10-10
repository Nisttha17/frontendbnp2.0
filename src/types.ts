export type ComplexityLevel = 'Basic' | 'Medium' | 'Advanced';
export type RequestStatus = 'Completed' | 'In Progress' | 'Pending' | 'Needs Review' | 'Rejected';
export type ComplianceStatus = 'Conflict' | 'Review' | 'Clear';
export type ImpactDecision = 'YES' | 'NO';
export type Regulation = 'EMIR' | 'UKEMIR' | 'ASIC' | 'MAS' | 'HKMA';

export interface RegulatoryImpactMap {
  EMIR: ImpactDecision;
  UKEMIR: ImpactDecision;
  ASIC: ImpactDecision;
  MAS: ImpactDecision;
  HKMA: ImpactDecision;
}

export interface ViolationEvidence {
  regulation: Regulation;
  document: string;
  clause: string;
  page: number;
  quote: string;
  impact: string;
}

export interface ChangeRequest {
  id: string; // e.g. "CR-001"
  srNo: string;
  complexity?: ComplexityLevel;
  description: string;
  status: RequestStatus;
  date: string;
  author?: string;
  jurisdiction?: string;
  fullDetails?: string;
  sourceDoc?: string;
  page?: number;
  relevantClause?: string;
  impactExplanation?: string;
  recommendation?: string;
  regulatoryImpacts?: RegulatoryImpactMap;
  matrixData?: Record<string, Record<string, ComplianceStatus>>;
}

export interface MetricSummary {
  totalChangeRequests: number;
  totalChangeRequestsTrend: string;
  conflictsDetected: number;
  conflictsTrend: string;
  needsHumanReview: number;
  reviewTrend: string;
  regulationsChecked: number;
  regulationsTrend: string;
}

export interface AssessmentItem {
  id: string;
  dateTime: string;
  requestId: string;
  status: RequestStatus;
  summary: string;
}

export interface JurisdictionMatrixRow {
  jurisdiction: string;
  mifid: ComplianceStatus;
  emir: ComplianceStatus;
  sftr: ComplianceStatus;
  doddFrank: ComplianceStatus;
  ukFca: ComplianceStatus;
  mas: ComplianceStatus;
}
