export type GetAllRegionsType = AllRegions[];

export interface AllRegions {
    id: number;
    code: number;
    name: Name;
    children: Children[];
}

export interface Name {
    ru: string;
    uz: string;
}

export interface Children {
    id: number;
    code: number;
    name: Name2;
    children: Children2[];
}

export interface Name2 {
    ru?: string;
    uz: string;
}

export interface Children2 {
    id: number;
    code: number;
    name: Name3;
    children: any[];
}

export interface Name3 {
    ru: string;
    uz: string;
}
