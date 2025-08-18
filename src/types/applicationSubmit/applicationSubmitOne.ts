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
    intellectual_property: any;
    research_project: any;
    additional_info: any;
    finance: any;
}

export interface Development {
    id: number;
    name: string;
    description: string;
    certificate_date: string;
    certificate_type: string;
    certificate_number: number;
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
