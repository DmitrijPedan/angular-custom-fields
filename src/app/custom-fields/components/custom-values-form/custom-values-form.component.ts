import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormArray, FormGroup} from "@angular/forms";
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
    private cvs: CustomValuesService,
  ) { }

  ngOnInit(): void {
    this.cvs.addDefaultFieldValues(this.data.fields);
    // const outputData = this.cvs.getOutputValues(this.data.fields)
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
    this.form = this.cvs.getInitialValuesForm(data);
  }


  submit(): void {
    this.submitHandle.emit(this.form.value)
  }

  // prepareDataObject(data: any, object: any): void {
  //   if (!data.fields) return;
  //   data.fields.forEach((field: ICustomField) => {
  //     object[field.conditions.name] = '';
  //     if (field.fields?.length) {
  //       object[field.conditions.name] = {};
  //       this.prepareDataObject(field, object[field.conditions.name])
  //     } else {
  //       object[field.conditions.name] = '';
  //     }
  //   })
  // }

}
