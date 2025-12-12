import {Field} from "./Field";

export interface Table {
    id: number;
    name: string;
    isAutoCreated: boolean;
    fields: Field[];
}