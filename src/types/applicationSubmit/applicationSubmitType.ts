export interface ApplicationSubmitRequest1Form {
    code: string;
    development: {
        name: string;
        description: string;
        creation_date: string;
        certificate_date: string;
        certificate_type: string;
        certificate_number: string;
        tin: string;
    };
}

export interface ApplicationSubmitRequest2Form {
    intellectual_property: {
        name: string;
        patent_number: string;
        registration_date: string;
        expired_at: string;
        authors: Author[];
    };
}

export interface Author {
    science_id: string;
}

export interface ApplicationSubmitRequest3Form {
    research_project: {
        name: string;
        implemented_deadline: string;
        region: number;
        project_manager: number;
        tin: string;
        science_field: number;
    };
}

export interface ApplicationSubmitRequest4Form {
    additional_info: {
        name: string;
        industry_affiliation: number;
        quality_level: number;
        bank_information: string;
        export_indicator: string;
        contract_count: number;
        contract_amount: string;
        production_facility_document: number;
        development_challenge: string;
        social_impact: string;
        consumer_organization: number[];
        files: FileData[];
        customs_documents: CustomsDocument[];
        photo_evidences: PhotoEvidence[];
    };
}

export interface FileData {
    file: number;
    is_main: boolean;
}

export interface CustomsDocument {
    file: number;
}

export interface PhotoEvidence {
    file: number;
}

export interface ApplicationSubmitRequest5Form {
    finance: {
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
    };
}

export interface ApplicationResponse {
    id: number;
    code: string;
    status: number;
    status_display: string;
    project: number;
    moderator: any;
    created_at: string;
    detail: string;
}
