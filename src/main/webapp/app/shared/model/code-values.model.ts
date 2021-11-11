import { ICodeTables } from '@/shared/model/code-tables.model';

export interface ICodeValues {
  id?: number;
  key?: string;
  value?: string | null;
  codeTables?: ICodeTables | null;
}

export class CodeValues implements ICodeValues {
  constructor(public id?: number, public key?: string, public value?: string | null, public codeTables?: ICodeTables | null) {}
}
