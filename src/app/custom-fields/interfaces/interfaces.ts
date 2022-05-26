export type FieldType = 'text' | 'checkbox' | 'repeater' | 'number' | 'textarea' | 'image';
export type FieldOption = 'value' | 'required' | 'min' | 'max' | 'step' | 'rows' | 'minLength' | 'maxLength' | 'accordionItemName';

export interface IFieldType {
  type: FieldType;
  displayName: string;
  options: FieldOption[];
}

export interface ICustomField {
  conditions: ICustomFieldConditions;
  fields: ICustomField[];
  value?: any;
}

export interface ICustomFieldConditions {
  name: string;
  label: string;
  type: FieldType;
  options: ICustomFieldAttributes;
}

export interface ICustomFieldAttributes {
  value?: string | boolean | number;
  required: boolean;
  minLength: number;
  maxLength: number;
  min: number;
  max: number;
  step: number;
  rows: number;
  accordionItemName: string;
}

export interface ICustomFieldsData {
  fields: ICustomField[];
}
