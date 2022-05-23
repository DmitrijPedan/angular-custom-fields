export type FieldType = 'text' | 'checkbox' | 'repeater' | 'number' | 'textarea';
export type FieldOption = 'value' | 'required' | 'min' | 'max' | 'step' | 'rows' | 'minLength' | 'maxLength';

export interface IFieldType {
  type: FieldType;
  displayName: string;
  options: FieldOption[];
}


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
