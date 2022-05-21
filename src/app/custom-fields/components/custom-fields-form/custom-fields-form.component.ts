import {Component, OnInit, Input} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import { CustomFieldService } from "../../services/custom-field.service";
import {FieldType} from "../../interfaces/interfaces";


@Component({
  selector: 'app-custom-fields-form',
  templateUrl: './custom-fields-form.component.html',
  styleUrls: ['./custom-fields-form.component.scss'],
})
export class CustomFieldsFormComponent   {

  @Input() data: any;
  form!: FormGroup;

  constructor(
    private cf: CustomFieldService,
    private fb: FormBuilder
  ) {
    this.initForm();
  }

  buildFormFromData() {
    if (this.data.fields.length) {
      this.initForm()
      this.data.fields.forEach((field: any) => {
        this.addField(field.conditions.type);
      })
    }
    setTimeout(() => {
      this.form.patchValue(this.data);
    }, 50);
  }

  addField(type?: FieldType) {
    this.fieldsFormArray.push(this.cf.getCustomFieldControls(type));
  }

  clear(): void {
    this.fieldsFormArray.setValue([])
  }

  deleteField(index: number) {
    this.fieldsFormArray.removeAt(index);
  }

  get fieldsFormArray(): FormArray {
    return this.form?.get("fields") as FormArray;
  }

  initForm() {
    this.form = this.cf.getInitialForm();
  }

}
