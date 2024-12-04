export type Role = 'admin' | 'moderator' | 'user';

const ROLE: Record<Role, string[]> = {
    admin:["view","edit","delete"],
    moderator:["view","edit"],
    user:["view","editOwn","deleteOwn"]
}

export const hasPermission = (role: Role, permission: string) => {
    return ROLE[role].includes(permission);
}