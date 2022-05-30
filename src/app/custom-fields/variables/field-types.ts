import {IFieldType} from "../interfaces/interfaces";

export const FIELD_TYPES: IFieldType[] = [
  {type: 'text', displayName: 'Text input', options: ['value', 'required', 'minLength', 'maxLength']},
  {type: 'textarea', displayName: 'Textarea input', options: ['value', 'required', 'rows', 'minLength', 'maxLength']},
  {type: 'checkbox', displayName: 'Checkbox', options: []},
  {type: 'number', displayName: 'Number input', options: ['value', 'required', 'min', 'max', 'step']},
  {type: 'image', displayName: 'Image', options: [ 'required']},
  {type: 'repeater', displayName: 'Repeater', options: [ 'accordionItemName', 'minLength', 'maxLength']},
];
