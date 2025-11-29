export type FieldType = 'text' | 'number' | 'radio' | 'toggle';

export interface SchemaField {
  id: string | number;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[];
  default?: any;
}

export interface SchemaSection {
  id: string;
  title: string;
  fields: SchemaField[];
}

export interface Schema {
  id: string;
  title: string;
  sections: SchemaSection[];
}

export interface SummaryRow {
  label: string;
  value: string;
}
