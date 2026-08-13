export interface User {
    id: string;
    email: string;
    fullName: string;
    role: 'OWNER';
}

export interface RegisterRequest {
    email: string;
    password: string;
    fullName: string;
}