import {IFieldType} from "../interfaces/interfaces";

export const FIELD_TYPES: IFieldType[] = [
  {type: 'text', displayName: 'Text input', options: ['value', 'required']},
  {type: 'checkbox', displayName: 'Checkbox', options: ['value']},
  {type: 'number', displayName: 'Number input', options: ['value', 'required', 'min', 'max', 'step']},
  {type: 'textarea', displayName: 'Textarea input', options: ['value', 'required', 'rows']},
  {type: 'repeater', displayName: 'Repeater', options: []},
];
