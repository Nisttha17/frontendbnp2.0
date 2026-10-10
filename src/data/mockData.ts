import { ChangeRequest, MetricSummary, AssessmentItem, JurisdictionMatrixRow, Regulation, ViolationEvidence } from '../types';

export const REGULATIONS: Regulation[] = ['EMIR', 'UKEMIR', 'ASIC', 'MAS', 'HKMA'];

export const initialMetrics: MetricSummary = {
  totalChangeRequests: 24,
  totalChangeRequestsTrend: '+2 this week',
  conflictsDetected: 8,
  conflictsTrend: '+1 this week',
  needsHumanReview: 5,
  reviewTrend: '-1 this week',
  regulationsChecked: 12,
  regulationsTrend: '+3 this week',
};

export const defaultMatrixRows: JurisdictionMatrixRow[] = [
  {
    jurisdiction: 'EU',
    mifid: 'Conflict',
    emir: 'Clear',
    sftr: 'Review',
    doddFrank: 'Conflict',
    ukFca: 'Clear',
    mas: 'Clear',
  },
  {
    jurisdiction: 'UK',
    mifid: 'Conflict',
    emir: 'Clear',
    sftr: 'Clear',
    doddFrank: 'Review',
    ukFca: 'Clear',
    mas: 'Clear',
  },
  {
    jurisdiction: 'US',
    mifid: 'Clear',
    emir: 'Review',
    sftr: 'Clear',
    doddFrank: 'Clear',
    ukFca: 'Clear',
    mas: 'Clear',
  },
  {
    jurisdiction: 'Singapore',
    mifid: 'Clear',
    emir: 'Clear',
    sftr: 'Clear',
    doddFrank: 'Clear',
    ukFca: 'Clear',
    mas: 'Review',
  },
];

export const initialChangeRequests: ChangeRequest[] = [
  {
    id: 'CR-001',
    srNo: 'CR-001',
    description: 'Update trade event timestamps',
    status: 'In Progress',
    date: '10 Oct 2026',
    fullDetails:
      'Update trade event timestamp fields to microsecond resolution for high-frequency algorithmic trade tracking and audit trail synchronization.',
    sourceDoc: 'ESMA RTS 25 / Article 12.3',
    page: 24,
    relevantClause:
      '“The trading venue shall ensure accurate ... timestamp of each trade lifecycle event with microsecond synchronization.”',
    impactExplanation:
      'The proposed change fails synchronization standards under EMIR, UKEMIR, and HKMA reporting gateways.',
    recommendation: 'Do Not Proceed.',
    regulatoryImpacts: {
      EMIR: 'NO',
      UKEMIR: 'NO',
      ASIC: 'YES',
      MAS: 'YES',
      HKMA: 'NO',
    },
  },
  {
    id: 'CR-002',
    srNo: 'CR-002',
    description: 'Modify counterparty details',
    status: 'In Progress',
    date: '09 Oct 2026',
    fullDetails:
      'Modify counterparty legal entity identifier (LEI) cache and natural person identifier attributes for cross-border swap dealers.',
    sourceDoc: 'MAS Notice 610 / ASIC Derivative Transaction Rules',
    page: 12,
    relevantClause:
      '“Reporting entities must capture natural person identifiers and updated LEI validation status for all active counterparties.”',
    impactExplanation:
      'Requires updated counterparty validation across ASIC, MAS, and HKMA regimes. Non-compliant with EMIR and UKEMIR schemas.',
    recommendation: 'Do Not Proceed.',
    regulatoryImpacts: {
      EMIR: 'NO',
      UKEMIR: 'NO',
      ASIC: 'YES',
      MAS: 'YES',
      HKMA: 'YES',
    },
  },
  {
    id: 'CR-003',
    srNo: 'CR-003',
    description: 'Change reporting fields',
    status: 'Pending',
    date: '08 Oct 2026',
    fullDetails:
      'Change trade reporting fields to support CPMI-IOSCO Unique Product Identifier (UPI) and revised technical guidance.',
    sourceDoc: 'EMIR Refit Validation Rules / UKEMIR Policy Statement',
    page: 58,
    relevantClause:
      '“Mandatory reporting fields updated to CPMI-IOSCO UPI and UTI standards across OTC derivative registries.”',
    impactExplanation:
      'Direct conflict identified with ASIC and HKMA trade repository schema character limits.',
    recommendation: 'Do Not Proceed.',
    regulatoryImpacts: {
      EMIR: 'YES',
      UKEMIR: 'YES',
      ASIC: 'NO',
      MAS: 'YES',
      HKMA: 'NO',
    },
  },
  {
    id: 'CR-004',
    srNo: 'CR-004',
    description: 'Add product type',
    status: 'Pending',
    date: '07 Oct 2026',
    fullDetails:
      'Add bespoke structured commodity swap product types to asset categorization taxonomies.',
    sourceDoc: 'UK EMIR Refit Annex I / ASIC Rule 2.2.1',
    page: 81,
    relevantClause:
      '“Product classification must conform to CFI codes with additional bespoke OTC derivative categories.”',
    impactExplanation:
      'Violates EMIR and MAS derivative taxonomies due to unmapped product identifier prefixes.',
    recommendation: 'Do Not Proceed.',
    regulatoryImpacts: {
      EMIR: 'NO',
      UKEMIR: 'YES',
      ASIC: 'YES',
      MAS: 'NO',
      HKMA: 'YES',
    },
  },
  {
    id: 'CR-005',
    srNo: 'CR-005',
    description: 'Remove obsolete field',
    status: 'Pending',
    date: '06 Oct 2026',
    fullDetails:
      'Remove legacy clearing broker indicator flag decommissioned under regulatory reporting harmonization.',
    sourceDoc: 'EMIR Technical Standards (EU 2022/1855) / MAS Circular',
    page: 35,
    relevantClause:
      '“Legacy clearing indicator flag decommissioned in favor of centralized clearing counterparty LEI.”',
    impactExplanation:
      'Violates UKEMIR, ASIC, and HKMA feeds where clearing indicator remains mandatory.',
    recommendation: 'Do Not Proceed.',
    regulatoryImpacts: {
      EMIR: 'YES',
      UKEMIR: 'NO',
      ASIC: 'NO',
      MAS: 'YES',
      HKMA: 'NO',
    },
  },
  {
    id: 'CR-006',
    srNo: 'CR-006',
    description: 'Update validation rules',
    status: 'In Progress',
    date: '05 Oct 2026',
    fullDetails:
      'Update submission validation engine to reject non-conforming collateral valuation timestamps and collateral haircuts.',
    sourceDoc: 'HKMA & ASIC Technical Guidance / EMIR Refit',
    page: 47,
    relevantClause:
      '“Validation rules enforced at submission gateway rejecting non-compliant collateral valuation timestamps.”',
    impactExplanation:
      'Violates MAS submission gateway rules which prohibit strict gateway-level collateral rejections without grace period.',
    recommendation: 'Do Not Proceed.',
    regulatoryImpacts: {
      EMIR: 'YES',
      UKEMIR: 'YES',
      ASIC: 'YES',
      MAS: 'NO',
      HKMA: 'YES',
    },
  },
  {
    id: 'CR-007',
    srNo: 'CR-007',
    description: 'Revise settlement instructions',
    status: 'Pending',
    date: '04 Oct 2026',
    fullDetails:
      'Revise automated settlement instruction messaging to align with ISO 20022 MX cash account format.',
    sourceDoc: 'UK FCA Handbook / MAS Securities and Futures Regulations',
    page: 63,
    relevantClause:
      '“Settlement instruction messaging must provide standard SWIFT BIC and cash account identifier.”',
    impactExplanation:
      'Triggers non-compliance under EMIR and ASIC messaging validation standards.',
    recommendation: 'Do Not Proceed.',
    regulatoryImpacts: {
      EMIR: 'NO',
      UKEMIR: 'YES',
      ASIC: 'NO',
      MAS: 'YES',
      HKMA: 'YES',
    },
  },
  {
    id: 'CR-008',
    srNo: 'CR-008',
    description: 'Include additional asset class',
    status: 'Pending',
    date: '03 Oct 2026',
    fullDetails:
      'Include cryptocurrency index derivatives and environmental commodity units in trade reporting scope.',
    sourceDoc: 'EMIR Refit Scope / ASIC OTC Derivative Regulations',
    page: 92,
    relevantClause:
      '“Commodity derivative and index derivatives classified under mandatory reportable transaction scope.”',
    impactExplanation:
      'Violates UKEMIR, MAS, and HKMA asset definitions for unregistered digital and environmental derivatives.',
    recommendation: 'Do Not Proceed.',
    regulatoryImpacts: {
      EMIR: 'YES',
      UKEMIR: 'NO',
      ASIC: 'YES',
      MAS: 'NO',
      HKMA: 'NO',
    },
  },
  {
    id: 'CR-009',
    srNo: 'CR-009',
    description: 'Routine schema metadata documentation update',
    status: 'Completed',
    date: '02 Oct 2026',
    fullDetails:
      'Non-functional documentation comments and metadata description updates for reporting gateways.',
    sourceDoc: 'Global ISO 20022 Schema Guidelines',
    page: 10,
    relevantClause:
      '“Informational comments in schema XML/JSON definitions do not affect field processing parity.”',
    impactExplanation:
      'No regulatory impact. Zero violations across all global reporting jurisdictions.',
    recommendation: 'Proceed with the change.',
    regulatoryImpacts: {
      EMIR: 'YES',
      UKEMIR: 'YES',
      ASIC: 'YES',
      MAS: 'YES',
      HKMA: 'YES',
    },
  },
];

export const REGULATION_EVIDENCE_MAP: Record<Regulation, {
  document: string;
  clause: string;
  page: number;
  quote: string;
  impactTemplate: (crId: string, desc: string) => string;
}> = {
  EMIR: {
    document: 'ESMA RTS 22 / EMIR Refit – Article 9.1',
    clause: '“Mandatory Reporting & Field Format Alignment”',
    page: 24,
    quote: '“Counterparties and CCPs shall ensure that the details of any derivative contract are reported without duplication, conforming strictly to the prescribed technical XML schema format.”',
    impactTemplate: (crId, desc) =>
      `Proposed change (${crId}: ${desc}) alters mandatory reporting fields, creating schema validation failures and reconciliation mismatches in EMIR trade repositories.`
  },
  UKEMIR: {
    document: 'Bank of England & FCA Policy Statement PS23/2',
    clause: '“Annex B – Trade State & Clock Traceability”',
    page: 18,
    quote: '“Reporting entities must adhere to Bank of England validation rules and clock synchronization tolerances. Non-conforming payloads shall be rejected at the gateway.”',
    impactTemplate: (crId, desc) =>
      `Fails UK EMIR post-Brexit bilateral reconciliation rules. Downstream UK trade repository gateways will reject modified messages for ${crId}.`
  },
  ASIC: {
    document: 'ASIC Derivative Transaction Rules (Reporting) 2024',
    clause: '“Rule 2.2.8 – Record Keeping & Unique Identifiers”',
    page: 41,
    quote: '“Reporting entities shall maintain synchronous timestamps and adhere to designated UTI/UPI character length limits without unauthorized custom field truncations.”',
    impactTemplate: (crId, desc) =>
      `Conflicts with ASIC transaction reporting standards. Field structure changes in ${crId} breach character length and validation guidelines.`
  },
  MAS: {
    document: 'MAS Notice 610 / Securities & Futures Regulations',
    clause: '“Regulation 7 – Derivative Contracts Verification”',
    page: 32,
    quote: '“Specified persons shall submit verified counterparty LEI and execution timestamp data within prescribed T+1 reporting deadlines with exact jurisdictional classification.”',
    impactTemplate: (crId, desc) =>
      `Violates MAS reporting accuracy thresholds and field taxonomy rules. Counterparty mapping is non-compliant for ${crId}.`
  },
  HKMA: {
    document: 'HKMA Supplementary Guidance on OTC Derivatives Reporting',
    clause: '“Section 3.4 – Mandatory Clearing & Intermediary Mapping”',
    page: 55,
    quote: '“Reporting entities must ensure full consistency in trade party classification according to HKMA trade repository validation filters.”',
    impactTemplate: (crId, desc) =>
      `Non-compliant with HKMA TR format validation filters and trade categorization rules for proposed change (${crId}).`
  }
};

export function getViolationEvidence(cr: ChangeRequest, reg: Regulation): ViolationEvidence {
  const base = REGULATION_EVIDENCE_MAP[reg];
  return {
    regulation: reg,
    document: base.document,
    clause: base.clause,
    page: base.page,
    quote: base.quote,
    impact: base.impactTemplate(cr.srNo, cr.description),
  };
}

export const initialAssessments: AssessmentItem[] = [
  {
    id: 'ASM-101',
    dateTime: '10 Oct 2026, 10:24 AM',
    requestId: 'CR-001',
    status: 'In Progress',
    summary: '3 regulations violated (EMIR, UKEMIR, HKMA). Do Not Proceed.',
  },
  {
    id: 'ASM-102',
    dateTime: '09 Oct 2026, 06:18 PM',
    requestId: 'CR-002',
    status: 'In Progress',
    summary: '2 regulations violated (EMIR, UKEMIR). Do Not Proceed.',
  },
  {
    id: 'ASM-103',
    dateTime: '08 Oct 2026, 03:12 PM',
    requestId: 'CR-003',
    status: 'Needs Review',
    summary: '2 regulations violated (ASIC, HKMA). Do Not Proceed.',
  },
  {
    id: 'ASM-104',
    dateTime: '07 Oct 2026, 11:45 AM',
    requestId: 'CR-006',
    status: 'Needs Review',
    summary: '1 regulation violated (MAS). Do Not Proceed.',
  },
];

export const mockNotifications = [
  {
    id: 'notif-1',
    title: 'Violations Flagged: CR-001',
    description: 'Evaluated against EMIR, UKEMIR, ASIC, MAS, HKMA. 3 violations identified.',
    time: '15 mins ago',
    unread: true,
  },
  {
    id: 'notif-2',
    title: 'Heatmap Impact Triggered: CR-006',
    description: 'CR-006 violates MAS reporting guidelines. Evidence panel loaded.',
    time: '2 hours ago',
    unread: true,
  },
  {
    id: 'notif-3',
    title: 'Regulatory Rule Reference Update',
    description: 'Updated ASIC CP 334 and MAS Notice 610 guidelines uploaded to repository.',
    time: 'Yesterday',
    unread: false,
  },
];
