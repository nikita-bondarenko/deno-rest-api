export type User = {
    id: string;
    name: string;
}

export type Context = {
    response: any,
    request?: any,
    params?: {id: string}
}