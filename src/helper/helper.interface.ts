interface ResParams{
    message?: string,
    data?: any;
}

interface Res{
    status: 'success' | 'error',
    message: string,
    data: any
}