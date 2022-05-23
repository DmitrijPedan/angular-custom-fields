import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators, FormControl} from "@angular/forms";
import {ICustomField} from "../interfaces/interfaces";

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

  getEmptyCustomFieldGroup(): FormGroup {
    return this.fb.group({
      conditions: {},
      fields: this.fb.array([])
    })
  }

  getCustomFieldGroup(): FormGroup {
    return  this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-z_-]*'), Validators.maxLength(255)]],
      label: ['', Validators.required],
      type: ['text', Validators.required],
      options: this.fb.group({
        value: [''],
        required: [false],
        minLength: [null],
        maxLength: [null],
        min: [1],
        max: [1],
        step: [1],
        rows: [1],
      }),
    })
  }

  getCustomFieldControls(): FormControl {
    return this.fb.control({
      name: '',
      label: '',
      type: 'text',
      options: {
        value: '',
        required: false,
        minLength: null,
        maxLength: null,
        min: 1,
        max: 1,
        step: 1,
        rows: 1,
      },
    });
  }

  // values form
  getInitValuesForm(): FormGroup {
    return this.fb.group({
      values: this.fb.array([])
    })
  }

  getFieldControl(field: ICustomField): FormControl {
    return this.fb.control(field.conditions.attributes?.value)
  }

  getEmptyValuesGroup(): FormGroup {
    return this.fb.group({})
  }


}
