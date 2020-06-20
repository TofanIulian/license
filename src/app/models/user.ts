export interface Roles {
    commoner?: boolean;
    association?: boolean;
    supremeAssociation?: boolean;
    admin?: boolean;
}

export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    association?: string;
    roles: Roles;
}