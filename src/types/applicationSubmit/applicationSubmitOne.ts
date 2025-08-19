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
    research_project: any;
    additional_info: any;
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
