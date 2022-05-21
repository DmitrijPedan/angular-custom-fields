import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators, FormControl} from "@angular/forms";
import {FieldType} from "../interfaces/interfaces";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CustomFieldService {

  public type$: BehaviorSubject<FieldType> = new BehaviorSubject<FieldType>('text');

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

  getCustomFieldGroup(type?: FieldType): FormGroup {
    if (!type) {
      type = this.type$.value
    }
    const group: FormGroup = this.fb.group({
      name: ['', [Validators.required]],
      label: ['', Validators.required],
      type: [type],
    })
    const options = this.fb.group({
      value: [''],
      required: [false],
    })
    if (type === 'number') {
      options.addControl('min', this.fb.control([1]));
      options.addControl('max', this.fb.control([1]));
      options.addControl('step', this.fb.control([1]));
    }
    group.addControl('options', options);
    if (type === "repeater") {
      group.addControl('fields', this.fb.array([]))
    }
    return group;
  }

  getCustomFieldControls(type?: FieldType): FormControl {
    if (!type) {
      type = this.type$.value
    }
    const formState: any = {
      name: '',
      label: '',
      type: type,
      options: {
        value: '',
        required: false,
      }
    }
    if (type === 'number') {
      formState.options.min = 1;
      formState.options.max = 1;
      formState.options.step = 1;
    }
    if (type === "repeater") {
      formState.fields = []
    }
    return this.fb.control(formState);
  }

}
