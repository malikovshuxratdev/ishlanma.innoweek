export interface DashboardStatistics {
    overall: Overall;
    regions: Region[];
}

export interface Overall {
    draft: number;
    submitted: number;
    approved: number;
    rejected: number;
    regions_count: number;
}

export interface Region {
    name: Name;
    code: number;
    draft: number;
    submitted: number;
    approved: number;
    rejected: number;
}

export interface Name {
    ru: string;
    uz: string;
}
