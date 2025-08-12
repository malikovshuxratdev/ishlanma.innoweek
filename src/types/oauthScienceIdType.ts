export interface OauthScienceIdBody {
    redirect_url: string;
}
export interface OauthScienceIdResponse {
    status: number;
    code: string;
    _code: string;
    message: any;
    data: Data;
}

export interface Data {
    redirect_url: string;
    login_url: string;
}

export interface ConfirmOneIdBody {
    code: string;
}

export interface ConfirmOneIdResponse {
    status: number;
    is_success: boolean;
    data: ResponseData;
}

export interface ResponseData {
    full_name: string;
    photo: string;
    science_id: string;
    access: string;
    refresh: string;
}

export interface UserProfileResponse {
    id: number;
    photo: string;
    role: number;
    science_id: string;
    username: any;
    pin: string;
    first_name: string;
    sur_name: string;
    middle_name: string;
    full_name: string;
    birth_date: string;
    birth_place: string;
    birth_country: any;
    citizen: string;
    gender: number;
    phone_number: string;
    password: any;
    last_login: any;
    is_verified: boolean;
    email: string;
    nationality: string;
    personal_address: string;
    passport_expr_date: string;
    passport_issue_date: string;
    passport_issue_place: string;
    passport_number: string;
    tin: any;
    live_status: boolean;
}
