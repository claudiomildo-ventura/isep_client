export interface Field {
    id: number;
    tableRelationId: number;
    columnName: string;
    type: string;
    index: string;
    length: number;
    sequence: number;
    isAutoCreated: boolean;
    isPrimaryKey: boolean;
    isForeignKey: boolean;
    isIndex: boolean;
    isNotNull: boolean;
}