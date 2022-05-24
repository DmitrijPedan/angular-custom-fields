import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormArray, FormGroup} from "@angular/forms";
import {ICustomFieldsData} from "../../interfaces/interfaces";
import {CustomValuesService} from "../../services/custom-values.service";
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
    private cvs: CustomValuesService,
    private cfs: CustomFieldService,
  ) { }

  get fieldsFormArray(): FormArray {
    return this.form?.get('fields') as FormArray;
  }

  ngOnInit(): void {
    this.cvs.addDefaultFieldValues(this.data.fields);
    this.buildFormFromData();
    console.log(this.form.value)
  }

  buildFormFromData() {
    if (this.data?.fields?.length) {
      this.initForm()
      this.data.fields.forEach((field: any) => {
        this.addField();
      })
    }
    setTimeout(() => this.form.patchValue(this.data), 0);
  }

  addField() {
    this.fieldsFormArray.push(this.cfs.getCustomFieldControls());
  }

  initForm() {
    this.form = this.cfs.getInitialForm();
  }

  submit(): void {
    const values = this.form.value;
    const data = this.cvs.getOutputValues(values.fields);
    this.submitHandle.emit(data)
  }

}
