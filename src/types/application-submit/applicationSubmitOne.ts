export interface GetApplication1 {
    id: number;
    code: string;
    status: number;
    status_display: string;
    project: Project;
    moderator: any;
    created_at: string;
    detail: string;
}

export interface Project {
    id: number;
    development: Development;
    intellectual_property: IntellectualProperty;
    research_project: ResearchProject;
    additional_info: AdditionalInfo;
    finance: any;
}

export interface Development {
    id: number;
    name: string;
    description: string;
    creation_date: string;
    certificate_date: string;
    certificate_type: string;
    certificate_number: string;
    organization: Organization;
}

export interface IntellectualProperty {
    id: number;
    name: string;
    patent_number: string;
    registration_date: string;
    author: Author[];
    expired_at: string;
}

export interface ResearchProject {
    id: number;
    name: string;
    implemented_deadline: string;
    region: Region;
    project_manager: ProjectManager;
    science_field: {
        id: number;
        name: string;
    };
    executor_organization: Organization;
}

export interface ProjectManager {
    id: number;
    science_id: string;
    full_name: string;
    photo: string;
}

export interface Region {
    id: number;
    code: number;
    name: {
        ru: string;
        uz: string;
    };
}

export interface AdditionalInfo {
    id: number;
    name: string;
    industry_affiliation: QualityLevel;
    quality_level: QualityLevel;
    bank_information: any;
    export_indicator: ExportIndicator;
    contract_count: number;
    contract_amount: string;
    production_facility_document: string;
    development_challenge: string;
    social_impact: string;
    consumer_organizations: Organization[];
    files: Files[];
    contract_files: Files[];
    photo_evidences: Files[];
    customs_documents: Files[];
}

export interface QualityLevel {
    id: number;
    name: string;
}

export interface ExportIndicator {
    [key: string]: number;
}

export interface Files {
    id: number;
    file: string;
}
export interface Organization {
    id: number;
    tin: string;
    short_name: string;
    registration_date: string;
    director: Director;
}

export interface Author {
    id: number;
    first_name: string;
    science_id: string;
}

export interface Director {
    id: number;
    first_name: string;
    last_name: string;
    middle_name: string;
    gender: string;
}
