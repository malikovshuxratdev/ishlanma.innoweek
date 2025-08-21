export interface GetMyApplicationType {
    count: number;
    next: any;
    previous: any;
    results: MyApplication[];
}

export interface MyApplication {
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
    photo: string;
}
