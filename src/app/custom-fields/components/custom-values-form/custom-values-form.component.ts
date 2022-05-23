import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormArray, FormGroup} from "@angular/forms";
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
    private cf: CustomFieldService,
  ) { }

  ngOnInit(): void {
    this.buildFormFromData(this.data)
  }

  get valuesFormArray(): FormArray {
    return this.form.get('values') as FormArray;
  }

  buildFormFromData(data: ICustomFieldsData): void {
    if (!data) return;
    this.form = this.cf.getInitValuesForm();
    data.fields.forEach(field => {
      this.valuesFormArray.push(this.cf.getFieldControl(field))
    })
  }

  submit(): void {
    this.submitHandle.emit(this.form.value)
  }

}
