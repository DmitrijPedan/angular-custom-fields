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
  public nesting = 0;

  constructor(
    private cvs: CustomValuesService,
  ) { }

  ngOnInit(): void {
    this.buildFormFromData();
  }

  get valuesFormArray(): FormArray {
    return this.form?.get('values') as FormArray;
  }

  buildFormFromData() {
    this.initForm();
    if (this.data?.fields?.length) {
      this.data.fields.forEach((field: any) => this.addValueField(field));
    }
    setTimeout(() => {
      // this.form.patchValue(this.data);
    }, 0);
  }

  addValueField(field: ICustomField): void {
    this.valuesFormArray.push(this.cvs.getCustomValueControls(field));
  }

  initForm(): void {
    this.form = this.cvs.getInitialForm();
  }

  submit(): void {
    const values = this.form.value;
    this.submitHandle.emit(values)
  }

}
