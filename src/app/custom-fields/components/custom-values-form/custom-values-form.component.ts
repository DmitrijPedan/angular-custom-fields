import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ICustomField, ICustomFieldsData} from "../../interfaces/interfaces";
import {CustomValuesService} from "../../services/custom-values.service";

@Component({
  selector: 'app-custom-values-form',
  templateUrl: './custom-values-form.component.html',
  styleUrls: ['./custom-values-form.component.scss']
})
export class CustomValuesFormComponent implements OnInit {

  @Input() data!: ICustomFieldsData;
  @Output() submitHandle: EventEmitter<any> = new EventEmitter<any>();

  public form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cvs: CustomValuesService,
  ) { }

  ngOnInit(): void {
    this.processFields(this.data.fields);
    this.getValues()
    // const object: any = {};
    // this.prepareDataObject(this.data, object);
    // console.log(object)
    this.buildFormFromData(this.data)
  }

  processFields(fields: ICustomField[]): void {
    fields.forEach(field => {
      field.value = this.getValue(field);
      this.processFields(field.fields)
    })
  }

  getValue(field: ICustomField): any {
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

  getValues(): void {
    const values: any = {};
    this.getFieldValues(this.data.fields, values);
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

  getControl(i: number) {
    return this.form.controls[i]
  }

  get valuesFormArray(): FormArray {
    return this.form.get('values') as FormArray;
  }

  buildFormFromData(data: ICustomFieldsData): void {
    if (!data) return;
    this.form = this.cvs.getInitialValuesForm(data);
  }


  submit(): void {
    this.submitHandle.emit(this.form.value)
  }

  prepareDataObject(data: any, object: any): void {
    if (!data.fields) return;
    data.fields.forEach((field: ICustomField) => {
      object[field.conditions.name] = '';
      if (field.fields?.length) {
        object[field.conditions.name] = {};
        this.prepareDataObject(field, object[field.conditions.name])
      } else {
        object[field.conditions.name] = '';
      }
    })
  }
}
