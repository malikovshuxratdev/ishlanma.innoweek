export interface GetByIdMyApplicationType {
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
    finance: Finance;
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

export interface Organization {
    id: number;
    tin: string;
    short_name: string;
    registration_date: string;
    director: Director;
}

export interface Director {
    id: number;
    first_name: string;
    last_name: string;
    middle_name: string;
    gender: string;
}

export interface IntellectualProperty {
    id: number;
    name: string;
    patent_number: string;
    registration_date: string;
    expired_at: string;
    authors: Author[];
}

export interface Author {
    id: number;
    science_id: string;
    full_name: string;
    photo: string;
}

export interface ResearchProject {
    id: number;
    name: string;
    code: string;
    implemented_deadline: string;
    region: Region;
    science_field: ScienceField;
    executor_organization: ExecutorOrganization;
}

export interface Region {
    id: number;
    code: number;
    name: Name;
}

export interface Name {
    ru: string;
    uz: string;
}

export interface ScienceField {
    id: number;
    name: string;
}

export interface ExecutorOrganization {
    id: number;
    tin: string;
    short_name: string;
    registration_date: string;
    director: Director2;
}

export interface Director2 {
    id: number;
    first_name: string;
    last_name: string;
    middle_name: string;
    gender: string;
}

export interface AdditionalInfo {
    id: number;
    name: string;
    industry_affiliation: IndustryAffiliation;
    quality_level: QualityLevel;
    bank_information: string;
    export_indicator: ExportIndicator;
    contract_count: number;
    contract_amount: string;
    production_facility_document: string;
    development_challenge: string;
    social_impact: string;
    consumer_organizations: ConsumerOrganization[];
    files: File[];
    contract_files: ContractFile[];
    photo_evidences: PhotoEvidence[];
    customs_documents: CustomsDocument[];
}

export interface IndustryAffiliation {
    id: number;
    name: string;
}

export interface QualityLevel {
    id: number;
    name: string;
}

export interface ExportIndicator {
    '2023': number;
}

export interface ConsumerOrganization {
    id: number;
    tin: string;
    short_name: string;
    registration_date: string;
    director: Director3;
}

export interface Director3 {
    id: number;
    first_name: string;
    last_name: string;
    middle_name: string;
    gender: string;
}

export interface File {
    id: number;
    file: string;
}

export interface ContractFile {
    id: number;
    file: string;
}

export interface PhotoEvidence {
    id: number;
    file: string;
}

export interface CustomsDocument {
    id: number;
    file: string;
}

export interface Finance {
    id: number;
    net_income: string;
    cost_of_goods_sold: string;
    gross_profit_or_loss: string;
    selling_expenses: string;
    administrative_expenses: string;
    other_operating_expenses: string;
    other_income: string;
    rental_income: string;
    foreign_exchange_gain: string;
    other_financial_income: string;
    foreign_exchange_loss: string;
    extraordinary_profit_or_loss: string;
    income_tax: string;
}
