import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ICustomField, ICustomFieldsData} from "../../interfaces/interfaces";
import {CustomFieldService} from "../../services/custom-field.service";

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
    private cf: CustomFieldService,
  ) { }

  ngOnInit(): void {
    console.log(this.data)
    // const object: any = {};
    // this.prepareDataObject(this.data, object);
    // console.log(object)
    this.buildFormFromData(this.data)
  }

  getControl(i: number) {
    return this.form.controls[i]
  }

  get valuesFormArray(): FormArray {
    return this.form.get('values') as FormArray;
  }

  buildFormFromData(data: ICustomFieldsData): void {
    if (!data) return;
    this.form = new FormGroup({});
    this.addGroup(this.data.fields, this.form);
    console.log(this.form)
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
