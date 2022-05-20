import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormArray,  Validators } from "@angular/forms";
import { FieldType } from "../interfaces/interfaces";

@Injectable({
  providedIn: 'root'
})
export class CustomFieldService {

  constructor(
    private fb: FormBuilder
  ) { }

  getInitialForm(): FormGroup {
    return this.fb.group({
      fields: this.fb.array([])
    })
  }

  getFormArray(): FormArray {
    return this.fb.array([]);
  }

  getCustomFieldGroup(type?: FieldType): FormGroup {
    const group: FormGroup = this.fb.group({
      name: ['', [Validators.required]],
      label: ['', Validators.required],
      type: [type],
    })
    // const options = this.fb.group({
    //   value: [''],
    //   required: [false],
    //   minLength: [''],
    //   maxLength: [''],
    // })
    // group.addControl('options', options);
    if (type === "repeater") {
      group.addControl('fields', this.fb.array([]))
    }
    return group;
  }

}
