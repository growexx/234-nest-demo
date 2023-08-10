export interface Access {
    method: string;
    path: string;
}
  
interface AccessList {
    [key: number]: Access[];
}
  
export const accessList: AccessList = {
    1: [
        { method: 'GET', path: '/auth/profile' },
        { method: 'POST', path: '/blog' },
        { method: 'GET', path: '/blog' },
        { method: 'GET', path: '/blog/:id' },
        { method: 'PUT', path: '/blog/:id' },
    ],
    4: [
        { method: 'GET', path: '/auth/profile' },
        { method: 'POST', path: '/blog' },
        { method: 'GET', path: '/blog' },
        { method: 'GET', path: '/blog/:id' },
        { method: 'PUT', path: '/blog/:id' },
        { method: 'PATCH', path: '/blog/:id' },
    ]
};
