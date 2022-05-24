import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators, FormControl} from "@angular/forms";
import {ICustomField, ICustomFieldsData} from "../interfaces/interfaces";

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

  // values root form
  getInitialValuesForm(data: ICustomFieldsData): FormGroup {
    const group = new FormGroup({});
    this.addGroup(data.fields, group);
    return group;
  }

  addGroup(fields: ICustomField[], group: FormGroup): void {
    fields.forEach(field => {
      if (field.conditions?.type !== 'repeater') {
        group.addControl(field.conditions.name, new FormControl(''))
      } else {
        const array = this.fb.array([]);
        group.addControl(field.conditions.name, array)
        const fieldGroup = this.fb.group({})
        this.addGroup(field.fields, fieldGroup);
        array.push(fieldGroup)
      }
    })
  }

  // group control
  getValueGroupControlForm(field: ICustomField): FormGroup {
    const fieldName = field.conditions.name;
    if (field.conditions.type !== 'repeater') {
      return this.getValueFormGroup(fieldName);
    } else {
      const group = this.fb.group({});
      const array = this.fb.array([]);
      field.fields.forEach(f => {
        const g = new FormGroup({});
        g.addControl(f.conditions.name, this.fb.control(''));
        array.push(g)
      })
      group.addControl(fieldName, array)
      return group;
    }
  }

  // value form
  getValueFormGroup(name: string): FormGroup {
    const group = this.fb.group({})
    group.addControl(name, this.fb.control(''))
    return group
  }


}
