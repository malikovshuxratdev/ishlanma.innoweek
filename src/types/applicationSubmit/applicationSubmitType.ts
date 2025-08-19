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

export interface ApplicationResponse1Form {
    id: number;
    code: string;
    status: number;
    status_display: string;
    project: number;
    moderator: any;
    created_at: string;
    detail: string;
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

export interface ApplicationSubmitRequest3Form {}

export interface ApplicationSubmitRequest4Form {}

export interface ApplicationSubmitRequest5Form {}
