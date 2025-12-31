export interface DashboardStat {
  label: string;
  value: number | string;
}

export interface DashboardSummaryRequest {
  year: string;
  type: string;
  session?: string;
}



export interface DashboardSummaryTypeRequest {
  year: string;
  session?: string;
}

export interface DashboardSummaryData {
  list: Record<string, unknown>[];
  collection_period: string;
  [key: string]: unknown;
}

export interface DashboardSummaryResponse {
  resultVal: string;
  more: DashboardSummaryData;
  nickname_list: string[];
}
