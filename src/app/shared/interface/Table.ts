import {Field} from "./Field";

export interface Table {
    id: number;
    name: string;
    type: string;
    isAutoCreated: boolean;
    fields: Field[];
}