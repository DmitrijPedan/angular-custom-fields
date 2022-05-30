import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";
import {ICustomField, ICustomFieldAttributes} from "../interfaces/interfaces";
import {ArrayValidators} from "../validators/array-validators";

@Injectable({
  providedIn: 'root'
})
export class CustomValuesService {

  constructor(
    private fb: FormBuilder
  ) { }

  validateFieldsArray(fields: ICustomField[]): boolean {
    if (!fields || !Array.isArray(fields)) return false;
    let valid = true;
    fields.forEach(field => {
      if (!this.validateField(field)) {
        valid = false;
        return;
      }
    })
    return valid;
  }

  validateField(field: ICustomField): boolean {
    return field.hasOwnProperty('conditions')
      && field.conditions.hasOwnProperty('name')
      && Array.isArray(field.fields);
  }

  getInitialForm(fields: ICustomField[]): FormGroup {
    const group = this.fb.group({});
    fields.forEach(field => {
      if (field.conditions?.name) {
        group.addControl(field.conditions.name, this.fb.control(this.getFieldValue(field)))
      }
    })
    return group;
  }

  getRepeaterGroup(field: ICustomField): FormGroup {
    const values: any = {};
    field.fields.forEach(field => {
      values[field.conditions.name] = this.getFieldValue(field);
    })
    return this.fb.group(values);
  }


  getCustomValueControls(field: ICustomField): FormControl {
    const isRepeater = Boolean(field.conditions.type === 'repeater');
    return this.fb.control({
      [field.conditions.name]: isRepeater ? [] : this.getFieldValue(field),
    });
  }

  getValuesGroupControl(field: ICustomField): FormGroup {
    const isRepeater = Boolean(field.conditions.type === 'repeater');
    const validators = [];
    if (isRepeater) {
      const minLength = field?.conditions?.options?.minLength;
      const maxLength = field?.conditions?.options?.maxLength;
      if (minLength) validators.push(ArrayValidators.minLength(minLength))
      if (maxLength) validators.push(ArrayValidators.maxLength(maxLength))
    }
    return this.fb.group({
      [field.conditions.name]: isRepeater
        ? this.fb.array([], validators)
        : this.getFieldValue(field),
    })
  }


  getCustomValueInput(field: ICustomField): FormGroup {
    const value = this.getFieldValue(field);
    const validators = this.getValidators(field);
    return this.fb.group({
      [field.conditions.name]: [value, validators]
    })
  }

  private getValidators(field: ICustomField): Validators[] {
    const validators = [];
    const attrs: ICustomFieldAttributes = field?.conditions?.options;
    if (attrs) {
      if (attrs.required) validators.push(Validators.required);
      if (Number.isInteger(attrs.max)) validators.push(Validators.max(Number(attrs.max)));
      if (Number.isInteger(attrs.min)) validators.push(Validators.min(Number(attrs.min)));
      if (Number.isInteger(attrs.minLength)) validators.push(Validators.minLength(Number(attrs.minLength)));
      if (Number.isInteger(attrs.maxLength)) validators.push(Validators.maxLength(Number(attrs.maxLength)));
    }
    return validators;
  }

  private getFieldValue(field: ICustomField): any {
    const defaultValue = field.conditions?.options?.value;
    switch (field.conditions?.type) {
      case "checkbox":
        return  false;
      case "number":
        return defaultValue ? defaultValue : 0;
      case "text" || 'textarea' || 'image':
        return defaultValue ? defaultValue : '';
      case "repeater":
        return []
    }
  }

}
