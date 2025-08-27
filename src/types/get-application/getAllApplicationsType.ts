export interface GetAllApplicationsType {
    next: any;
    previous: any;
    page_size: number;
    current_page: number;
    total_pages: number;
    page_items: number;
    total: number;
    results: AllApplication[];
}

export interface AllApplication {
    id: number;
    name: string;
    organization: Organization;
    created_by: CreatedBy;
    rate_avg: number;
    comment_count: number;
    image: string;
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

export interface CreatedBy {
    id: number;
    science_id: string;
    full_name: string;
    photo?: string;
}
