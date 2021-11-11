import { ICodeValues } from '@/shared/model/code-values.model';

export interface ICodeTables {
  id?: number;
  description?: string;
  codeValues?: ICodeValues[] | null;
}

export class CodeTables implements ICodeTables {
  constructor(public id?: number, public description?: string, public codeValues?: ICodeValues[] | null) {}
}
