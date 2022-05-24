import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, FormControl} from "@angular/forms";
import {ICustomField, ICustomFieldsData} from "../interfaces/interfaces";

@Injectable({
  providedIn: 'root'
})
export class CustomValuesService {

  constructor(
    private fb: FormBuilder
  ) { }

  public addDefaultFieldValues(fields: ICustomField[]): void {
    fields.forEach(field => {
      field.value = this.getFieldValue(field);
      this.addDefaultFieldValues(field.fields)
    })
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

  getOutputValues(fields: ICustomField[]): any {
    const values: any = {};
    this.getFieldValues(fields, values);
    return values;
  }

  getFieldValues(fields: ICustomField[], object: any): void {
    fields.forEach(field => {
      object[field.conditions.name] = field.value;
      if (field.conditions.type === 'repeater') {
        const obj = {}
        this.getFieldValues(field.fields, obj);
        object[field.conditions.name].push(obj)
      }
    })
  }

  // values root form
  getInitialValuesForm(data: ICustomFieldsData): FormGroup {
    const group = new FormGroup({});
    this.addGroup(data.fields, group);
    return group;
  }

  addGroup(fields: ICustomField[], group: FormGroup): void {
    fields.forEach(field => {
      if (field.conditions?.type !== 'repeater') {
        group.addControl(field.conditions.name, new FormControl(''))
      } else {
        const array = this.fb.array([]);
        group.addControl(field.conditions.name, array)
        const fieldGroup = this.fb.group({})
        this.addGroup(field.fields, fieldGroup);
        array.push(fieldGroup)
      }
    })
  }

  // group control
  getValueGroupControlForm(field: ICustomField): FormGroup {
    const fieldName = field.conditions.name;
    if (field.conditions.type !== 'repeater') {
      return this.getValueFormGroup(fieldName);
    } else {
      const group = this.fb.group({});
      const array = this.fb.array([]);
      field.fields.forEach(f => {
        const g = new FormGroup({});
        g.addControl(f.conditions.name, this.fb.control(''));
        array.push(g)
      })
      group.addControl(fieldName, array)
      return group;
    }
  }

  // value form
  getValueFormGroup(name: string): FormGroup {
    const group = this.fb.group({})
    group.addControl(name, this.fb.control(''))
    return group
  }


}
