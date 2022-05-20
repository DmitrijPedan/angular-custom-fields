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
    this.createForm();
  }

  buildFormFromData() {
    if (this.data.groups.length) {
      this.addGroup();
    }

    setTimeout(() => {
      this.form.patchValue(this.data);
    }, 50);
  }

  addGroup(type?: FieldType) {
    this.fieldsFormArray.push(
      this.fb.control({
        conditions: [],
        groups: []
      })
    );
  }

  clear(): void {
    this.fieldsFormArray.setValue([])
  }

  delete(index: number) {
    this.fieldsFormArray.removeAt(index);
  }

  get fieldsFormArray(): FormArray {
    return this.form?.get("fields") as FormArray;
  }

  createForm() {
    this.form = this.cf.getInitialForm();
  }

}
