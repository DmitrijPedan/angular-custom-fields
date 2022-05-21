export type FieldType = 'text' | 'checkbox' | 'repeater';

export interface ICustomField {
  conditions: ICustomFieldConditions;
  fields?: ICustomField[];
}

export interface ICustomFieldConditions {
  name: string;
  label: string;
  type: FieldType;
  attributes: ICustomFieldAttributes;
}

export interface ICustomFieldAttributes {
  value?: string | boolean | number;
  required?: boolean;
  minLength: number;
  maxLength: number;
  rows: number;
}
