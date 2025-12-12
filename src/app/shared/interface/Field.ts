export interface Field {
    id: number;
    tableId: number;
    name: string;
    type: string;
    length: number;
    isAutoCreated: boolean;
    isKey: boolean;
    isNotNull: boolean;
}