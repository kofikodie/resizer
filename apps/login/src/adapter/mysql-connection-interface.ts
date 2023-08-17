export interface Connection {
    connect(): Promise<any>
    execute(query: string, params?: any[]): Promise<any>
    close(): Promise<void>
}