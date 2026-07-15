import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
export declare class DatabaseService implements OnModuleInit, OnModuleDestroy {
    private readonly logger;
    private pool;
    onModuleInit(): void;
    query<T = any>(text: string, params?: any[]): Promise<T[]>;
    private createTables;
    onModuleDestroy(): Promise<void>;
}
