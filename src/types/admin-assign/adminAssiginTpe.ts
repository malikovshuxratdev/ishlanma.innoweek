export interface AuthorAssignType {
    id: number;
    science_id: string;
    first_name: string;
    sur_name: string;
    middle_name: string;
    role: number;
    role_display: string;
}

export interface OrganizationType {
    status: number;
    is_success: boolean;
    code_detail: any;
    response_code: any;
    error: any;
    data: Data;
}

export interface Data {
    tin: string;
    name: string;
    address: string;
    registration_date: string;
    director: string;
}
