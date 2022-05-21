import {Component, Input} from '@angular/core';
import {FormArray, FormGroup} from "@angular/forms";
import {CustomFieldService} from "../../services/custom-field.service";
import {FieldType} from "../../interfaces/interfaces";

@Component({
  selector: 'app-custom-fields-form',
  templateUrl: './custom-fields-form.component.html',
  styleUrls: ['./custom-fields-form.component.scss'],
})
export class CustomFieldsFormComponent   {

  @Input() data: any;
  public form!: FormGroup;

  constructor(
    private cf: CustomFieldService,
  ) {
    this.initForm();
  }

  get fieldsFormArray(): FormArray {
    return this.form?.get('fields') as FormArray;
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

  deleteField(index: number) {
    this.fieldsFormArray.removeAt(index);
  }

  initForm() {
    this.form = this.cf.getInitialForm();
  }

}
