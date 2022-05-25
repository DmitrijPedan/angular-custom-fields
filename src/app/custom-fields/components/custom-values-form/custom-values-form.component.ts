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

  @Input() customFields!: ICustomFieldsData;
  @Input() values!: any;
  @Output() submitHandle: EventEmitter<any> = new EventEmitter<any>();
  public form!: FormGroup;
  public nesting = 0;

  constructor(
    private cvs: CustomValuesService,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.buildForm(this.customFields);
    this.patchForm(this.values);
  }

  buildForm(customFields: ICustomFieldsData) {
    if (customFields?.fields?.length) {
      this.customFields.fields.forEach((field: ICustomField) => {
        this.valuesFormArray.push(this.cvs.getCustomValueControls(field))
      });
    }
  }

  patchForm(values: any): void {
    if (!values) return;
    setTimeout(() => {
      this.form.patchValue(values);
    })
  }

  get valuesFormArray(): FormArray {
    return this.form?.get('values') as FormArray;
  }

  initForm(): void {
    this.form = this.cvs.getInitialForm();
  }

  submit(): void {
    const values = this.form.value;
    this.submitHandle.emit(values)
  }

}
