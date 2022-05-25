import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";
import {ICustomField, ICustomFieldAttributes} from "../interfaces/interfaces";

@Injectable({
  providedIn: 'root'
})
export class CustomValuesService {

  constructor(
    private fb: FormBuilder
  ) { }

  getInitialForm(fields: ICustomField[]): FormGroup {
    const group = this.fb.group({});
    fields.forEach(field => {
      group.addControl(field.conditions.name, this.fb.control(this.getFieldValue(field)))
    })
    return group;
  }

  // getInitialForm(f): FormGroup {
  //   return this.fb.group({
  //     values: this.fb.array([])
  //   })
  // }

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
    return this.fb.group({
      [field.conditions.name]: isRepeater ? this.fb.array([]) : this.getFieldValue(field),
    })
  }


  getCustomValueInput(field: ICustomField): FormGroup {
    const value = this.getFieldValue(field);
    const validators = this.getValidators(field?.conditions?.options);
    return this.fb.group({
      [field.conditions.name]: [value, validators]
    })
  }

  private getValidators(attrs: ICustomFieldAttributes): Validators[] {
    const validators = [];
    if (attrs) {
      if (attrs.required) validators.push(Validators.required);
      if (Number.isInteger(attrs.minLength)) validators.push(Validators.minLength(Number(attrs.minLength)));
      if (Number.isInteger(attrs.maxLength)) validators.push(Validators.maxLength(Number(attrs.maxLength)));
      if (Number.isInteger(attrs.max)) validators.push(Validators.max(Number(attrs.max)));
      if (Number.isInteger(attrs.min)) validators.push(Validators.min(Number(attrs.min)));
    }
    return validators
  }

  private getFieldValue(field: ICustomField): any {
    const defaultValue = field.conditions?.options?.value;
    switch (field.conditions.type) {
      case "checkbox":
        return defaultValue ? defaultValue : false;
      case "number":
        return defaultValue ? defaultValue : 0;
      case "text":
        return defaultValue ? defaultValue : '';
      case "repeater":
        return []
    }
  }


}
