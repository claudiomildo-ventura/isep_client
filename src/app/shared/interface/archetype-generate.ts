import {Table} from "src/app/shared/interface/Table";

export interface ArchetypeGenerate {
    architecture: number
    dbPlatform: number
    dbEngineer: number
    environment: number
    template: number
    scaffold: number
    table: Table[]
}